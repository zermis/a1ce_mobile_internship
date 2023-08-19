import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';

import PageContainer from '../../containers/PageContainer';
import WeeklyCalendar from '../../components/calendar/WeeklyCalendar';
import DefaultMainHeader from '../../components/shared/DefaultMainHeader';
import FilterBar from '../../components/shared/FilterBar';
import ErrorOverlay from '../../components/shared/ErrorOverlay';
import LoadingOverlay from '../../components/shared/LoadingOverlay';
import { CalendarEvent } from '../../models/Calendar';
import * as CalendarService from '../../services/Calendar';
import {
    GetItem,
    SaveItem,
    StorageRecordData
} from '../../utils/LocalAsyncStorage';
import TokenKey from '../../constants/TokenKey';
import { StudentCompetency } from '../../models/Student';
import moment from 'moment';
import { ISwitchSelectorOption } from 'react-native-switch-selector';
import ERROR_MESSAGE from '../../constants/ErrorMessage';
import { AppDispatch, RootState } from '../../stores/Store';
import * as UserAction from '../../stores/actions/User';
import CONNECTION_STATUS from '../../constants/ConnectionStatus';
import CALENDAR_FILTER from '../../constants/FilterMenu';

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const filterMenu: ISwitchSelectorOption[] = [
    { label: 'Show All', value: CALENDAR_FILTER.SHOW_ALL },
    { label: 'Only Competencies', value: CALENDAR_FILTER.ONLY_COMPETENCY }
];

const CalendarScreen = (props: Props): JSX.Element => {
    const [events, setEvents] = useState<any>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [calendarEvent, setCalendarEvent] = useState<CalendarEvent[]>([]);
    const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
    const [startDate, setStartDate] = useState<string>(
        moment().startOf('week').format('YYYY-MM-DD').toString()
    );
    const [endDate, setEndDate] = useState<string>(
        moment().endOf('week').format('YYYY-MM-DD').toString()
    );

    const dispatch: AppDispatch = useDispatch();
    const connectionStatus = useSelector(
        (state: RootState) => state.user.connectionMode
    );

    const saveDataIntoStorage = (calendarEventData: CalendarEvent[]): void => {
        const calendarEventStorage: StorageRecordData = {
            key: TokenKey.calendarCalendarEvent,
            data: calendarEventData
        };

        void SaveItem(calendarEventStorage);
    };

    const fetchCalendarEvent = useCallback(
        async (startDate: string, endDate: string): Promise<void> => {
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
                const resData =
                    (await CalendarService.getCalendarEvent(
                        startDate,
                        endDate
                    )) || ([] as CalendarEvent[]);

                setCalendarEvent(resData);
                setEvents(resData);
                saveDataIntoStorage(resData);
            } catch (error: unknown) {
                setError(ERROR_MESSAGE.ONLINE_FETCHING_ERROR);
            }
            setIsLoading(false);
        },
        [setCalendarEvent, setIsLoading, setError, connectionStatus]
    );

    const fetchCalendarEventOffline = useCallback(async (): Promise<void> => {
        if (connectionStatus === CONNECTION_STATUS.ONLINE) {
            dispatch(
                UserAction.ChangeConnectionModeAction(CONNECTION_STATUS.OFFLINE)
            );
            return;
        }
        setIsLoading(true);
        setError(null);

        try {
            const calendarEventData = await GetItem(
                TokenKey.calendarCalendarEvent
            );
            setCalendarEvent(calendarEventData || []);
            setEvents(calendarEventData || []);
        } catch (error: unknown) {
            setError(ERROR_MESSAGE.OFFLINE_FETCHING_ERROR);
        }

        setIsLoading(false);
    }, [setCalendarEvent, setIsLoading, setError, connectionStatus]);

    useEffect(() => {
        if (connectionStatus === CONNECTION_STATUS.ONLINE) {
            void fetchCalendarEvent(startDate, endDate);
        } else {
            void fetchCalendarEventOffline();
        }
    }, [fetchCalendarEvent, connectionStatus, startDate && endDate]);

    const handleChangeCurrentDate = (currentDate: string) => {
        const currDate = moment(currentDate);
        setSelectedDate(currDate);
        setStartDate(
            currDate.clone().startOf('week').format('YYYY-MM-DD').toString()
        );
        setEndDate(
            currDate.clone().endOf('week').format('YYYY-MM-DD').toString()
        );
    };

    const headerContent = <DefaultMainHeader>Calendar</DefaultMainHeader>;

    const onFilter = (value: number) => {
        if (value !== CALENDAR_FILTER.SHOW_ALL) {
            setEvents(
                calendarEvent?.filter((event: any) =>
                    event.related_competencies.some(
                        (competency: StudentCompetency[]) => competency
                    )
                )
            );
        } else {
            setEvents(calendarEvent);
        }
    };

    const filterSelector = (
        <FilterBar
            filterMenu={filterMenu}
            onPress={(value) => onFilter(Number(value))}
        />
    );

    const bodyContent = error ? (
        <ErrorOverlay
            message={error}
            onPressTryAgain={() => void fetchCalendarEvent(startDate, endDate)}
            onPressOffline={() => void fetchCalendarEventOffline()}
        />
    ) : isLoading ? (
        <LoadingOverlay />
    ) : (
        <View style={styles.screen}>
            <WeeklyCalendar
                events={events}
                filterSelector={filterSelector}
                navigation={props.navigation}
                currentDate={handleChangeCurrentDate}
                selectedDate={selectedDate}
            />
        </View>
    );

    return (
        <PageContainer
            isMain={true}
            headerContent={headerContent}
            bodyContent={bodyContent}
            accessibilityLabel="Calendar-Screen"
        ></PageContainer>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 10
    },
    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '800'
    }
});

export default CalendarScreen;
