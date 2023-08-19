import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import PageContainer from '../../containers/PageContainer';
import DefaultMainHeader from '../../components/shared/DefaultMainHeader';
import CalendarContent from '../../components/dashboard/CalendarContent';
import CompentencyContent from '../../components/dashboard/CompetencyContent';
import MilestoneContent from '../../components/dashboard/MilestoneContent';
import ErrorOverlay from '../../components/shared/ErrorOverlay';
import LoadingOverlay from '../../components/shared/LoadingOverlay';
import TokenKey from '../../constants/TokenKey';
import Timeline from '../../components/milestone/Timeline';
import { StudentCompetency } from '../../models/Student';
import { CalendarEvent } from '../../models/Calendar';
import { Roadmap } from '../../models/Roadmap';
import { UniversitySemester } from '../../models/UniversitySemester';
import { AppDispatch, RootState } from '../../stores/Store';
import {
    StorageRecordData,
    SaveMultiItem,
    SaveItem,
    GetItem
} from '../../utils/LocalAsyncStorage';
studentId_mock;
import CONNECTION_STATUS from '../../constants/ConnectionStatus';
import ERROR_MESSAGE from '../../constants/ErrorMessage';
import { STUDENT_CARD_STATUS } from '../../constants/TaskStatus';
import { studentId_mock } from '../../mock/student';
import { uniCode_mock } from '../../mock/university';
import {
    FindCurrentYearAndSemester,
    FormatYearAndSemester
} from '../../utils/UniversityYearSemester';
import * as CompetencyService from '../../services/Competency';
import * as CalendarService from '../../services/Calendar';
import * as MilestoneService from '../../services/Milestone';
import * as SemesterService from '../../services/Semester';
import * as UserAction from '../../stores/actions/User';
import { FilterRoadmap } from '../../utils/Roadmap';

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface DashboardParams {
    studentId: string;
    startDate: string;
    endDate: string;
    uniCode: string;
}

const DashboardScreen = (props: Props): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [studentCard, setStudentCard] = useState<StudentCompetency[]>([]);
    const [calendarEvent, setCalendarEvent] = useState<CalendarEvent[]>([]);
    const [roadmap, setRoadmap] = useState<Roadmap[]>([]);
    const [isYearSemesterFetched, setIsYearSemesterFetched] =
        useState<boolean>(false);
    const [isYearSemesterFound, setIsYearSemesterFound] = useState<
        boolean | null
    >(null);
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedSemester, setSelectedSemester] = useState<string>('');
    const [uniYearSemester, setUniYearSemester] = useState<
        UniversitySemester[]
    >([]);
    const dispatch: AppDispatch = useDispatch();
    const connectionStatus = useSelector(
        (state: RootState) => state.user.connectionMode
    );

    /* MOCK DATA */
    const today = new Date();
    const formattedDate = moment(today).format('YYYY-MM-DD').toString();
    const studentId = studentId_mock;
    const uniCode = uniCode_mock;

    const dashboardParams: DashboardParams = {
        studentId,
        startDate: formattedDate,
        endDate: formattedDate,
        uniCode
    };

    const filterOnlyInprogress = (
        studentCard: StudentCompetency[]
    ): StudentCompetency[] => {
        const filteredCard = studentCard.filter(
            (card: StudentCompetency) =>
                card.status_val === STUDENT_CARD_STATUS.IN_PROGRESS
        );

        return filteredCard;
    };

    const filterRoadmap = (
        roadmap: Roadmap[],
        year: string,
        semester: string
    ): Roadmap => {
        if (!year || !semester) {
            return {} as Roadmap;
        }
        const filteredRoadmap = roadmap.filter((item) => {
            return (
                item.year === parseInt(year) &&
                item.semester === `${semester} ${year}`
            );
        });

        return filteredRoadmap.length > 0
            ? filteredRoadmap[0]
            : ({} as Roadmap);
    };

    const saveDataIntoStorage = (
        cardData: StudentCompetency[],
        eventData: CalendarEvent[],
        yearSemData: UniversitySemester[]
    ): void => {
        const studentCardStorage: StorageRecordData = {
            key: TokenKey.dashboardStudentCard,
            data: cardData
        };

        const calendarEventStorage: StorageRecordData = {
            key: TokenKey.dashboardCalendarEvent,
            data: eventData
        };

        const yearSemesterStorage: StorageRecordData = {
            key: TokenKey.semesterRoadmap,
            data: yearSemData
        };

        void SaveMultiItem([
            studentCardStorage,
            calendarEventStorage,
            yearSemesterStorage
        ]);
    };

    const fetchContent = useCallback(
        async (dashboardParams: DashboardParams): Promise<void> => {
            if (connectionStatus === CONNECTION_STATUS.OFFLINE) {
                dispatch(
                    UserAction.ChangeConnectionModeAction(
                        CONNECTION_STATUS.ONLINE
                    )
                );
                return;
            }
            setIsLoading(true);
            setError(null);
            setIsYearSemesterFetched(false);
            setIsYearSemesterFound(null);
            setSelectedYear('');
            setSelectedSemester('');

            try {
                const cardData =
                    (await CompetencyService.getStudentCard(
                        dashboardParams.studentId
                    )) || ([] as StudentCompetency[]);

                const eventData =
                    (await CalendarService.getCalendarEvent(
                        dashboardParams.startDate,
                        dashboardParams.endDate
                    )) || ([] as CalendarEvent[]);

                const yearSemesterData =
                    (await SemesterService.getSemester(
                        dashboardParams.uniCode
                    )) || ([] as UniversitySemester[]);

                const filteredCard = filterOnlyInprogress(cardData);
                const [currentYearSem, isFound] =
                    FindCurrentYearAndSemester(yearSemesterData);

                setSelectedYear(currentYearSem.year);
                setSelectedSemester(currentYearSem.semester);
                setIsYearSemesterFound(isFound);
                setIsYearSemesterFetched(true);

                setStudentCard(filteredCard);
                setCalendarEvent(eventData);
                setUniYearSemester(yearSemesterData);
                saveDataIntoStorage(filteredCard, eventData, yearSemesterData);
            } catch (error: unknown) {
                setError(ERROR_MESSAGE.ONLINE_FETCHING_ERROR);
            }

            setIsLoading(false);
        },
        [
            setStudentCard,
            setCalendarEvent,
            setIsLoading,
            setError,
            studentId,
            uniCode,
            connectionStatus
        ]
    );

    const fetchContentOffline = useCallback(async (): Promise<void> => {
        if (connectionStatus === CONNECTION_STATUS.ONLINE) {
            dispatch(
                UserAction.ChangeConnectionModeAction(CONNECTION_STATUS.OFFLINE)
            );
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const cardData = await GetItem(TokenKey.dashboardStudentCard);
            const eventData = await GetItem(TokenKey.dashboardCalendarEvent);
            const roadmapData = await GetItem(TokenKey.milestoneRoadmap);
            const uniYearSemesterData = await GetItem(TokenKey.semesterRoadmap);

            setRoadmap(roadmapData || []);
            setUniYearSemester(uniYearSemesterData || []);
            setStudentCard(cardData || []);
            setCalendarEvent(eventData || []);
        } catch (error: unknown) {
            setError(ERROR_MESSAGE.OFFLINE_FETCHING_ERROR);
        }

        setIsLoading(false);
    }, [
        setStudentCard,
        setCalendarEvent,
        setIsLoading,
        setError,
        connectionStatus
    ]);

    const fetchRoadmap = useCallback(async (): Promise<void> => {
        if (connectionStatus === CONNECTION_STATUS.OFFLINE) {
            dispatch(
                UserAction.ChangeConnectionModeAction(CONNECTION_STATUS.ONLINE)
            );
            return;
        }

        try {
            const roadmapData =
                (await MilestoneService.getRoadmap(
                    selectedYear,
                    selectedSemester,
                    studentId
                )) || ([] as Roadmap[]);

            const storage: StorageRecordData = {
                key: TokenKey.milestoneRoadmap,
                data: roadmapData
            };

            setRoadmap(roadmapData);
            void SaveItem(storage);
        } catch (error: unknown) {
            setError(ERROR_MESSAGE.ONLINE_FETCHING_ERROR);
        }
    }, [
        setRoadmap,
        setIsLoading,
        setError,
        studentId,
        selectedYear,
        selectedSemester
    ]);

    useEffect(() => {
        if (connectionStatus === CONNECTION_STATUS.ONLINE) {
            void fetchContent(dashboardParams);
        } else {
            void fetchContentOffline();
        }
    }, [fetchContent, studentId, formattedDate, connectionStatus]);

    useEffect(() => {
        if (isYearSemesterFetched) {
            if (selectedYear && selectedSemester) {
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

    const formattedYearSemester = FormatYearAndSemester(uniYearSemester);
    const selectedRoadmap = FilterRoadmap(
        roadmap,
        selectedYear,
        selectedSemester
    );

    const headerContent = <DefaultMainHeader>Dashboard</DefaultMainHeader>;

    const bodyContent = error ? (
        <ErrorOverlay
            message={error}
            onPressTryAgain={() => void fetchContent(dashboardParams)}
            onPressOffline={() => void fetchContentOffline()}
        />
    ) : isLoading ? (
        <LoadingOverlay />
    ) : (
        <ScrollView
            style={styles.screen}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
        >
            <View style={styles.mainContainer}>
                <CalendarContent
                    todayEvents={calendarEvent}
                    navigation={props.navigation}
                />
            </View>

            {studentCard?.length !== 0 && (
                <View style={styles.mainContainer}>
                    <CompentencyContent
                        studentCard={studentCard}
                        navigation={props.navigation}
                    />
                </View>
            )}

            {roadmap.length !== 0 && (
                <View style={styles.mainContainer}>
                    <MilestoneContent
                        roadmap={selectedRoadmap}
                        semester={formattedYearSemester}
                        selectedYear={selectedYear}
                        selectedSemester={selectedSemester}
                        setSelectedYear={setSelectedYear}
                        setSelectedSemester={setSelectedSemester}
                        navigation={props.navigation}
                    />
                </View>
            )}
        </ScrollView>
    );

    return (
        <PageContainer
            isMain={true}
            headerContent={headerContent}
            bodyContent={bodyContent}
            accessibilityLabel="Dashboard-Screen"
        ></PageContainer>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    mainContainer: {
        paddingTop: 20
    }
});

export default DashboardScreen;
