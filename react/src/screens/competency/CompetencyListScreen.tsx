import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../../components/competency/Card';
import DefaultMainHeader from '../../components/shared/DefaultMainHeader';
import Colors from '../../constants/Colors';
import PageContainer from '../../containers/PageContainer';
import FilterBar from '../../components/shared/FilterBar';
import EmptyItem from '../../components/shared/EmptyItem';
import ErrorOverlay from '../../components/shared/ErrorOverlay';
import LoadingOverlay from '../../components/shared/LoadingOverlay';
import { StudentCompetency } from '../../models/Student';
import * as CompetencyService from '../../services/Competency';
import { STUDENT_CARD_STATUS } from '../../constants/TaskStatus';
import {
    GetItem,
    SaveItem,
    StorageRecordData
} from '../../utils/LocalAsyncStorage';
import TokenKey from '../../constants/TokenKey';
import ERROR_MESSAGE from '../../constants/ErrorMessage';
import { AppDispatch, RootState } from '../../stores/Store';
import CONNECTION_STATUS from '../../constants/ConnectionStatus';
import * as UserAction from '../../stores/actions/User';

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const filterMenu = [
    { label: 'All', value: STUDENT_CARD_STATUS.ALL },
    { label: 'Selected', value: STUDENT_CARD_STATUS.SELECTED },
    { label: 'In progress', value: STUDENT_CARD_STATUS.IN_PROGRESS },
    { label: 'Completed', value: STUDENT_CARD_STATUS.COMPLETED }
];

const CompetencyListScreen = (props: Props): JSX.Element => {
    const subdomainTitle: string = props.navigation.getParam('subdomainTitle');
    const subdomainId: string = props.navigation.getParam('subdomainId');
    const studentId = '0ac9506a-c008-40ac-b2a4-979160113260';
    const [filteredCards, setFilteredCards] = useState<StudentCompetency[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [studentCard, setStudentCard] = useState<StudentCompetency[]>([]);
    const competencyTokenKey = `${TokenKey.competencyListStudentCard}:${subdomainId}`;

    const dispatch: AppDispatch = useDispatch();
    const connectionStatus = useSelector(
        (state: RootState) => state.user.connectionMode
    );

    const saveDataIntoStorage = (
        listStudentCardData: StudentCompetency[]
    ): void => {
        const studentCardStorage: StorageRecordData = {
            key: competencyTokenKey,
            data: listStudentCardData
        };

        void SaveItem(studentCardStorage);
    };

    const fetchStudentCard = useCallback(
        async (studentId: string, subdomainId: string): Promise<void> => {
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

            try {
                const resData = await CompetencyService.getStudentCard(
                    studentId,
                    subdomainId
                );
                saveDataIntoStorage(resData);
                if (resData) {
                    resData.sort(
                        (a: StudentCompetency, b: StudentCompetency) =>
                            a.status_val - b.status_val
                    );
                    setStudentCard(resData);
                    setFilteredCards(resData);
                }
            } catch (error: unknown) {
                setError(ERROR_MESSAGE.ONLINE_FETCHING_ERROR);
            }
            setIsLoading(false);
        },
        [
            setStudentCard,
            setFilteredCards,
            setIsLoading,
            setError,
            connectionStatus
        ]
    );

    const fetchStudentCardOffline = useCallback(async (): Promise<void> => {
        if (connectionStatus === CONNECTION_STATUS.ONLINE) {
            dispatch(
                UserAction.ChangeConnectionModeAction(CONNECTION_STATUS.OFFLINE)
            );
            return;
        }
        setIsLoading(true);
        setError(null);

        try {
            const studentCardData = await GetItem(competencyTokenKey);
            setStudentCard(studentCardData || []);
            setFilteredCards(studentCardData || []);
        } catch (error: unknown) {
            setError(ERROR_MESSAGE.OFFLINE_FETCHING_ERROR);
        }

        setIsLoading(false);
    }, [
        setStudentCard,
        setFilteredCards,
        setIsLoading,
        setError,
        connectionStatus
    ]);

    useEffect(() => {
        if (connectionStatus === CONNECTION_STATUS.ONLINE) {
            void fetchStudentCard(studentId, subdomainId);
        } else {
            void fetchStudentCardOffline();
        }
    }, [fetchStudentCard, connectionStatus]);

    const onFilter = (menu: number) => {
        if (menu !== STUDENT_CARD_STATUS.ALL) {
            setFilteredCards(
                studentCard?.filter(
                    (card: StudentCompetency) => card.status_val === menu
                )
            );
        } else {
            setFilteredCards(studentCard);
        }
    };

    const headerContent = (
        <DefaultMainHeader>{subdomainTitle}</DefaultMainHeader>
    );

    const bodyContent = error ? (
        <ErrorOverlay
            message={error}
            onPressTryAgain={() =>
                void fetchStudentCard(studentId, subdomainId)
            }
            onPressOffline={() => void fetchStudentCardOffline()}
        />
    ) : isLoading ? (
        <LoadingOverlay />
    ) : (
        <View style={styles.screen}>
            <View style={styles.menu}>
                <FilterBar
                    filterMenu={filterMenu}
                    onPress={(value) => onFilter(Number(value))}
                />
            </View>
            <View style={styles.cardNumber}>
                {filteredCards && filteredCards.length > 0 && (
                    <Text style={styles.cardNumberText}>
                        {filteredCards.length}/{studentCard.length} Cards
                    </Text>
                )}
            </View>
            {!filteredCards ||
                (filteredCards.length <= 0 && (
                    <EmptyItem header="No card available." />
                ))}

            <FlatList
                key={'#'}
                data={filteredCards}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.row}
                keyExtractor={(card: StudentCompetency) => card.id}
                renderItem={({ item }) => (
                    <Card studentCard={item} navigation={props.navigation} />
                )}
            />
        </View>
    );

    return (
        <PageContainer
            isMain={false}
            headerContent={headerContent}
            bodyContent={bodyContent}
            accessibilityLabel="Competency-Student-Screen"
        ></PageContainer>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    menu: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        justifyContent: 'space-between'
    },
    noCard: {
        fontSize: 16,
        paddingTop: 50,
        alignSelf: 'center'
    },
    cardNumberText: {
        fontSize: 12,
        fontWeight: '300',
        color: Colors.primaryTextColor
    },
    cardNumber: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginHorizontal: 10
    }
});

export default CompetencyListScreen;
