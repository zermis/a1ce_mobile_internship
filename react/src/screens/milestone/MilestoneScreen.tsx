import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';

import PageContainer from '../../containers/PageContainer';
import MilestoneTimeline from '../../components/milestone/MilestoneTimeline';
import DefaultMainHeader from '../../components/shared/DefaultMainHeader';
import ErrorOverlay from '../../components/shared/ErrorOverlay';
import LoadingOverlay from '../../components/shared/LoadingOverlay';
import Colors from '../../constants/Colors';
import TokenKey from '../../constants/TokenKey';
import ERROR_MESSAGE from '../../constants/ErrorMessage';
import * as MilestoneService from '../../services/Milestone';
import * as SemesterService from '../../services/Semester';
import { Roadmap } from '../../models/Roadmap';
import { UniversitySemester } from '../../models/UniversitySemester';
import {
    GetItem,
    SaveItem,
    StorageRecordData
} from '../../utils/LocalAsyncStorage';
import * as UserAction from '../../stores/actions/User';
import { AppDispatch, RootState } from '../../stores/Store';
import CONNECTION_STATUS from '../../constants/ConnectionStatus';
import ERROR_TYPE from '../../constants/ErrorType';
import { studentId_mock } from '../../mock/student';
import { uniCode_mock } from '../../mock/university';
import {
    FindCurrentYearAndSemester,
    FormatYearAndSemester
} from '../../utils/UniversityYearSemester';
import { FilterRoadmap } from '../../utils/Roadmap';

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const saveDataIntoStorage = (
    key: string,
    data: Roadmap[] | UniversitySemester[]
): void => {
    const storage: StorageRecordData = { key, data };
    void SaveItem(storage);
};

const MilestoneScreen = (props: Props): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isYearSemesterFetched, setIsYearSemesterFetched] =
        useState<boolean>(false);
    const [isYearSemesterFound, setIsYearSemesterFound] = useState<
        boolean | null
    >(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedSemester, setSelectedSemester] = useState<string>('');
    const [uniYearSemester, setUniYearSemester] = useState<
        UniversitySemester[]
    >([]);

    const [roadmap, setRoadmap] = useState<Roadmap[]>([]);
    const dispatch: AppDispatch = useDispatch();
    const connectionStatus = useSelector(
        (state: RootState) => state.user.connectionMode
    );

    const uniCode = uniCode_mock;
    const studentId = studentId_mock;

    const fetchUniYearSemester = useCallback(async (): Promise<void> => {
        if (connectionStatus === CONNECTION_STATUS.OFFLINE) {
            dispatch(
                UserAction.ChangeConnectionModeAction(CONNECTION_STATUS.ONLINE)
            );
            return;
        }
        setError(null);
        setIsLoading(true);
        setIsYearSemesterFetched(false);
        setIsYearSemesterFound(null);
        setSelectedYear('');
        setSelectedSemester('');

        try {
            const yearSemesterData =
                (await SemesterService.getSemester(uniCode)) ||
                ([] as UniversitySemester[]);

            const [currentYearSem, isFound] =
                FindCurrentYearAndSemester(yearSemesterData);

            setIsYearSemesterFetched(true);
            setIsYearSemesterFound(isFound);
            setSelectedYear(currentYearSem.year);
            setSelectedSemester(currentYearSem.semester);
            setUniYearSemester(yearSemesterData);
            saveDataIntoStorage(TokenKey.semesterRoadmap, yearSemesterData);
        } catch (error: unknown) {
            setError(
                ERROR_MESSAGE.ONLINE_FETCHING_ERROR +
                    ERROR_TYPE.FETCH_UNIVERSITY
            );
        }
    }, [uniCode, connectionStatus]);

    const fetchRoadmap = useCallback(async (): Promise<void> => {
        if (connectionStatus === CONNECTION_STATUS.OFFLINE) {
            dispatch(
                UserAction.ChangeConnectionModeAction(CONNECTION_STATUS.ONLINE)
            );
            return;
        }
        setError(null);
        setIsLoading(true);

        try {
            const roadmapData =
                (await MilestoneService.getRoadmap(
                    selectedYear,
                    selectedSemester,
                    studentId
                )) || ([] as Roadmap[]);

            setRoadmap(roadmapData);
            saveDataIntoStorage(TokenKey.milestoneRoadmap, roadmapData);
        } catch (error: unknown) {
            setError(
                ERROR_MESSAGE.ONLINE_FETCHING_ERROR + ERROR_TYPE.FETCH_ROADMAP
            );
        }

        setIsLoading(false);
    }, [studentId, selectedYear, selectedSemester, connectionStatus]);

    const fetchRoadmapOffline = useCallback(async (): Promise<void> => {
        if (connectionStatus === CONNECTION_STATUS.ONLINE) {
            dispatch(
                UserAction.ChangeConnectionModeAction(CONNECTION_STATUS.OFFLINE)
            );
            return;
        }
        setIsLoading(true);
        setError(null);

        try {
            const roadmapData = await GetItem(TokenKey.milestoneRoadmap);
            const uniYearSemesterData = await GetItem(TokenKey.semesterRoadmap);

            setRoadmap(roadmapData || []);
            setUniYearSemester(uniYearSemesterData || []);
            setIsYearSemesterFetched(true);
            setIsYearSemesterFound(true);
        } catch (error: unknown) {
            setError(ERROR_MESSAGE.OFFLINE_FETCHING_ERROR);
        }

        setIsLoading(false);
    }, [
        setRoadmap,
        setUniYearSemester,
        setIsLoading,
        setError,
        connectionStatus
    ]);

    useEffect(() => {
        if (connectionStatus === CONNECTION_STATUS.ONLINE) {
            void fetchUniYearSemester();
        } else {
            void fetchRoadmapOffline();
        }
    }, [fetchUniYearSemester, connectionStatus]);

    useEffect(() => {
        if (
            isYearSemesterFetched &&
            connectionStatus === CONNECTION_STATUS.ONLINE
        ) {
            if (
                selectedYear &&
                selectedSemester &&
                isYearSemesterFound !== null
            ) {
                void fetchRoadmap();
            } else if (isYearSemesterFound === false) {
                setIsLoading(false);
            }
        }
    }, [
        selectedYear,
        selectedSemester,
        isYearSemesterFetched,
        isYearSemesterFound
    ]);

    const fetchOnlineError = () =>
        error ===
        ERROR_MESSAGE.ONLINE_FETCHING_ERROR + ERROR_TYPE.FETCH_UNIVERSITY
            ? void fetchUniYearSemester()
            : void fetchRoadmap();

    const formattedYearSemester = FormatYearAndSemester(uniYearSemester);
    const selectedRoadmap = FilterRoadmap(
        roadmap,
        selectedYear,
        selectedSemester
    );

    const headerContent = <DefaultMainHeader>Milestone</DefaultMainHeader>;

    const bodyContent = error ? (
        <ErrorOverlay
            message={error}
            onPressTryAgain={() => void fetchOnlineError()}
            onPressOffline={() => void fetchRoadmapOffline()}
        />
    ) : isLoading ? (
        <LoadingOverlay />
    ) : (
        <View style={styles.screen}>
            <MilestoneTimeline
                roadmap={selectedRoadmap}
                semester={formattedYearSemester}
                selectedYear={selectedYear}
                selectedSemester={selectedSemester}
                setSelectedYear={setSelectedYear}
                setSelectedSemester={setSelectedSemester}
                navigation={props.navigation}
            />
        </View>
    );

    return (
        <PageContainer
            isMain={true}
            headerContent={headerContent}
            bodyContent={bodyContent}
            accessibilityLabel="Milestone-Screen"
        ></PageContainer>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    timeline: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: Colors.cardBackgroundColor,
        fontSize: 30,
        fontWeight: '800'
    }
});

export default MilestoneScreen;
