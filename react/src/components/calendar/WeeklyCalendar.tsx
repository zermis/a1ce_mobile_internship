import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Platform,
    ActivityIndicator,
    StyleSheet,
    LayoutAnimation
} from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';
import moment from 'moment';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { Entypo } from '@expo/vector-icons';
import { calendarStyle } from '../../shared/Styles';
import EmptyItem from '../shared/EmptyItem';
import { CalendarEvent } from '../../models/Calendar';

interface Props {
    /** initially selected day */
    selectedDate: moment.Moment;
    /** If firstDay = 1, week starts from Monday. If firstDay = 7, week starts from Sunday. */
    startWeekday: number;
    /** Set format to display title (e.g. titleFormat='MMM YYYY' displays "Jan 2020") */
    titleFormat?: string;
    /** Set format to display weekdays (e.g. weekdayFormat='dd' displays "Mo" and weekdayFormat='ddd' displays "Mon") */
    weekdayFormat?: string;
    /** Set locale (e.g. Korean='ko', English='en', Chinese(Mandarin)='zh-cn', etc.) */
    locale: string;
    /** Set list of events you want to display below weekly calendar. */
    events?: CalendarEvent[] | any;
    /** Set theme color */
    themeColor?: string;
    /** Set style of component */
    style?: object;
    /** Set text style of calendar title */
    titleStyle?: object;
    /** Set text style of weekday labels */
    dayLabelStyle?: object;
    // Show filter or switch button
    filterSelector?: JSX.Element;
    // Navigation props
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    // Get current date from calendar screen
    currentDate: (date: string) => void;
}

interface EventView {
    start_time: moment.Moment;
    end_time: moment.Moment;
    title:
        | boolean
        | React.ReactChild
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined;
}

const WeeklyCalendar = (props: Props) => {
    const [currDate, setCurrDate] = useState<moment.Moment>(
        props.selectedDate.locale(props.locale)
    );
    const [weekdays, setWeekdays] = useState<Array<moment.Moment>>([]);
    const [currWeek, setCurrWeek] = useState<Array<moment.Moment | string>>([]);
    const [eventCurrDate] = useState<Array<string>>([]);
    const [showTable, setShowTable] = useState<boolean>(false);
    const [weekdayLabels, setWeekdayLabels] = useState<Array<moment.Moment>>(
        []
    );
    const [selectedDate, setSelectedDate] = useState<moment.Moment>(
        currDate.clone()
    );
    const [isCalendarReady, setCalendarReady] = useState<boolean>(false);
    const [pickerDate, setPickerDate] = useState<moment.Moment>(
        currDate.clone()
    );
    const [isPickerVisible, setPickerVisible] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [eventMap, setEventMap] = useState<
        Map<string, CalendarEvent[] | undefined>
    >(new Map());
    const [scheduleView, setScheduleView] = useState<JSX.Element[]>([]);
    const scrollViewRef = useRef<ScrollView>(null);
    const [offsets, setOffsets] = useState<number[]>([]);

    useEffect(() => {
        const createEventMap = (events: CalendarEvent[]) => {
            const dateMap = new Map<string, CalendarEvent[] | undefined>();
            if (events.length) {
                setShowTable(true);
            } else {
                setShowTable(false);
            }

            for (let i = 0; i < events.length; i++) {
                const eventDate = moment(events[i].date)
                    .format('YYYY-MM-DD')
                    .toString();
                if (dateMap.has(eventDate)) {
                    const eventArr = dateMap.get(eventDate);
                    eventArr?.push(events[i]);
                    dateMap.set(eventDate, eventArr);
                } else {
                    eventCurrDate.push(eventDate);
                    dateMap.set(eventDate, [events[i]]);
                }
            }
            if (!active) return;
            setEventMap(dateMap);
            createWeekdays(currDate, dateMap);
        };

        let active = true;
        setSelectedDate(props.selectedDate.locale(props.locale));
        createEventMap(props.events);
        LayoutAnimation.easeInEaseOut();
        setCalendarReady(true);
        return () => {
            active = false;
        };
    }, [props.events, selectedDate, props.selectedDate]);

    const createWeekdays = (date: moment.Moment, map: any) => {
        const dayViews: JSX.Element[] = [];
        const offsets: Array<number> = [];
        setWeekdays([]);
        setWeekdayLabels([]);
        setCurrWeek([]);
        for (let i = 0; i < 7; i++) {
            const weekdayToAdd = date
                .clone()
                .weekday(props.startWeekday - 7 + i);
            currWeek.push(weekdayToAdd.format('YYYY-MM-DD'));
            setWeekdays((weekdays: moment.Moment[]) => [
                ...weekdays,
                weekdayToAdd
            ]);
            setWeekdayLabels((weekdayLabels: any) => [
                ...weekdayLabels,
                weekdayToAdd.locale(props.locale).format(props.weekdayFormat)
            ]);

            // render schedule view
            const events = map.get(
                weekdayToAdd.format('YYYY-MM-DD').toString()
            );
            let eventViews: EventView[] = [];
            if (events !== undefined) {
                // Event list on right side
                eventViews = events.map(
                    (
                        event: {
                            start_time: moment.Moment;
                            end_time: moment.Moment;
                            title:
                                | boolean
                                | React.ReactChild
                                | React.ReactFragment
                                | React.ReactPortal
                                | null
                                | undefined;
                        },
                        j: string | number
                    ) => {
                        const startTime = event.start_time;
                        const endTime = event.end_time;
                        return (
                            <View key={`${i}-${j}`}>
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.navigate({
                                            routeName: 'ActivityDetail',
                                            params: {
                                                calendarEvent: event
                                            }
                                        });
                                    }}
                                >
                                    <View style={calendarStyle.event}>
                                        <View
                                            style={calendarStyle.eventDuration}
                                        >
                                            <View
                                                style={
                                                    calendarStyle.durationContainer
                                                }
                                            >
                                                <View
                                                    style={
                                                        calendarStyle.durationDot
                                                    }
                                                />
                                                <Text
                                                    style={
                                                        calendarStyle.durationText
                                                    }
                                                >
                                                    {startTime}
                                                </Text>
                                            </View>
                                            <View style={{ paddingTop: 10 }} />
                                            <View
                                                style={
                                                    calendarStyle.durationContainer
                                                }
                                            >
                                                <View
                                                    style={
                                                        calendarStyle.durationDot
                                                    }
                                                />
                                                <Text
                                                    style={
                                                        calendarStyle.durationText
                                                    }
                                                >
                                                    {endTime}
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    calendarStyle.durationDotConnector
                                                }
                                            />
                                        </View>
                                        <View
                                            style={calendarStyle.eventContainer}
                                        >
                                            <Text
                                                style={calendarStyle.eventNote}
                                            >
                                                {event.title}
                                            </Text>
                                            <Entypo
                                                name="chevron-right"
                                                size={24}
                                                color="red"
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                {j < events.length - 1 && (
                                    <View style={calendarStyle.lineSeparator} />
                                )}
                            </View>
                        );
                    }
                );
            }

            const dayView = (
                // Date list on left side and whole
                <View
                    key={i.toString()}
                    style={[styles.day, i === 0 ? { borderTopWidth: 0 } : {}]}
                    onLayout={(event) => {
                        offsets[i] = event.nativeEvent.layout.y;
                        setOffsets([...offsets, offsets[i]]);
                        if (isSelectedDate(weekdays[i])) {
                            if (i === 0) {
                                scrollViewRef.current?.scrollTo({
                                    y: offsets[i] - 1
                                });
                            } else {
                                scrollViewRef.current?.scrollTo({
                                    y: offsets[i]
                                });
                            }
                        }
                    }}
                >
                    <View
                        style={[
                            calendarStyle.dayLabel,
                            isCalendarReady && isSelectedDate(weekdays[i])
                                ? { backgroundColor: 'red' }
                                : {}
                        ]}
                    >
                        <Text
                            style={[
                                calendarStyle.monthDateText,
                                isCalendarReady && isSelectedDate(weekdays[i])
                                    ? { color: 'white' }
                                    : {}
                            ]}
                        >
                            {weekdayToAdd.format('M/D').toString()}
                        </Text>
                        <Text
                            style={[
                                calendarStyle.dayText,
                                isCalendarReady && isSelectedDate(weekdays[i])
                                    ? { color: 'white' }
                                    : {}
                            ]}
                        >
                            {weekdayToAdd
                                .locale(props.locale)
                                .format(props.weekdayFormat)
                                .toString()}
                        </Text>
                    </View>
                    <View
                        style={[
                            calendarStyle.allEvents,
                            eventViews.length === 0
                                ? {
                                      width: '80%',
                                      backgroundColor: '#EFEFEF',
                                      borderLeftColor: 'grey',
                                      borderLeftWidth: 0.7
                                  }
                                : {}
                        ]}
                    >
                        {eventViews}
                    </View>
                </View>
            );

            dayViews.push(dayView);
        }

        setScheduleView(dayViews);
    };

    const clickLastWeekHandler = () => {
        setCalendarReady(false);
        const lastWeekCurrDate = currDate.subtract(7, 'days');
        setCurrDate(lastWeekCurrDate.clone());
        setSelectedDate(
            lastWeekCurrDate.clone().weekday(props.startWeekday - 7)
        );
        props.currentDate(
            lastWeekCurrDate
                .clone()
                .weekday(props.startWeekday - 7)
                .format('YYYY-MM-DD')
        );
        createWeekdays(lastWeekCurrDate.clone(), eventMap);
        setCalendarReady(true);
    };

    const clickNextWeekHandler = () => {
        setCalendarReady(false);
        const nextWeekCurrDate = currDate.add(7, 'days');
        setCurrDate(nextWeekCurrDate.clone());
        setSelectedDate(
            nextWeekCurrDate.clone().weekday(props.startWeekday - 7)
        );
        props.currentDate(
            nextWeekCurrDate
                .clone()
                .weekday(props.startWeekday - 7)
                .format('YYYY-MM-DD')
        );
        createWeekdays(nextWeekCurrDate.clone(), eventMap);
        setCalendarReady(true);
    };

    const isSelectedDate = (date: {
        year: () => number;
        month: () => number;
        date: () => number;
    }) => {
        return (
            selectedDate.year() === date.year() &&
            selectedDate.month() === date.month() &&
            selectedDate.date() === date.date()
        );
    };

    const pickerOnChange = (_event: Event, pickedDate: Date | undefined) => {
        if (Platform.OS === 'android') {
            setPickerVisible(false);
            setLoading(true);
            if (pickedDate !== undefined) {
                // when confirm pressed
                setTimeout(() => {
                    const pickedDateMoment = moment(pickedDate).locale(
                        props.locale
                    );
                    setPickerDate(pickedDateMoment);
                    confirmPickerHandler(pickedDateMoment);
                    setLoading(false);
                }, 0);
            } else setLoading(false);
        } else setPickerDate(moment(pickedDate).locale(props.locale));
    };

    const confirmPickerHandler = (pickedDate: moment.Moment) => {
        const pickedDateMoment = moment(pickedDate);
        props.currentDate(pickedDateMoment.format('YYYY-MM-DD'));
        setCurrDate(pickedDate);
        setCalendarReady(false);
        createWeekdays(pickedDate, eventMap);
        setCalendarReady(true);
        setSelectedDate(pickedDate);

        setPickerVisible(false);
    };

    const onDayPress = (
        weekday: { clone: () => moment.Moment },
        i: string | number
    ) => {
        if (showTable) {
            if (i === 0) {
                scrollViewRef.current?.scrollTo({
                    y: 0,
                    animated: true
                });
            } else {
                scrollViewRef.current?.scrollTo({
                    y: offsets[Number(i)],
                    animated: true
                });
            }
        }
        setSelectedDate(weekday.clone());
        props.currentDate(weekday.clone().format('YYYY-MM-DD'));
    };

    return (
        <View style={[styles.component]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setPickerVisible(true)}>
                    <Text style={[styles.monthTitle]}>
                        {isCalendarReady &&
                            selectedDate
                                .locale(props.locale)
                                .clone()
                                .format('MMMM YYYY')}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.week}>
                <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={clickLastWeekHandler}
                >
                    <Entypo name="chevron-left" size={24} color="red" />
                </TouchableOpacity>
                <View style={styles.weekDayDateLabelWrapper}>
                    <View style={styles.weekdayLabelContainer}>
                        <View style={styles.weekdayLabel}>
                            <Text
                                style={[
                                    styles.weekdayLabelText,
                                    props.dayLabelStyle
                                ]}
                            >
                                {weekdays.length > 0 ? weekdayLabels[0] : ''}
                            </Text>
                        </View>
                        <View style={styles.weekdayLabel}>
                            <Text
                                style={[
                                    styles.weekdayLabelText,
                                    props.dayLabelStyle
                                ]}
                            >
                                {weekdays.length > 0 ? weekdayLabels[1] : ''}
                            </Text>
                        </View>
                        <View style={styles.weekdayLabel}>
                            <Text
                                style={[
                                    styles.weekdayLabelText,
                                    props.dayLabelStyle
                                ]}
                            >
                                {weekdays.length > 0 ? weekdayLabels[2] : ''}
                            </Text>
                        </View>
                        <View style={styles.weekdayLabel}>
                            <Text
                                style={[
                                    styles.weekdayLabelText,
                                    props.dayLabelStyle
                                ]}
                            >
                                {weekdays.length > 0 ? weekdayLabels[3] : ''}
                            </Text>
                        </View>
                        <View style={styles.weekdayLabel}>
                            <Text
                                style={[
                                    styles.weekdayLabelText,
                                    props.dayLabelStyle
                                ]}
                            >
                                {weekdays.length > 0 ? weekdayLabels[4] : ''}
                            </Text>
                        </View>
                        <View style={styles.weekdayLabel}>
                            <Text
                                style={[
                                    styles.weekdayLabelText,
                                    props.dayLabelStyle
                                ]}
                            >
                                {weekdays.length > 0 ? weekdayLabels[5] : ''}
                            </Text>
                        </View>
                        <View style={styles.weekdayLabel}>
                            <Text
                                style={[
                                    styles.weekdayLabelText,
                                    props.dayLabelStyle
                                ]}
                            >
                                {weekdays.length > 0 ? weekdayLabels[6] : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.weekdayNumberContainer}>
                        <TouchableOpacity
                            style={styles.weekDayNumber}
                            onPress={onDayPress.bind(this, weekdays[0], 0)}
                        >
                            <View
                                style={
                                    isCalendarReady &&
                                    isSelectedDate(weekdays[0])
                                        ? [
                                              styles.weekDayNumberCircle,
                                              { backgroundColor: 'red' }
                                          ]
                                        : {}
                                }
                            >
                                <Text
                                    style={
                                        isCalendarReady &&
                                        isSelectedDate(weekdays[0])
                                            ? styles.weekDayNumberTextToday
                                            : { color: props.themeColor }
                                    }
                                >
                                    {isCalendarReady ? weekdays[0].date() : ''}
                                </Text>
                            </View>
                            {isCalendarReady &&
                                eventMap.get(
                                    weekdays[0].format('YYYY-MM-DD').toString()
                                ) !== undefined && (
                                    <View
                                        style={
                                            isSelectedDate(weekdays[0])
                                                ? [
                                                      calendarStyle.dot,
                                                      {
                                                          backgroundColor:
                                                              'white'
                                                      }
                                                  ]
                                                : [
                                                      calendarStyle.dot,
                                                      { backgroundColor: 'red' }
                                                  ]
                                        }
                                    />
                                )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.weekDayNumber}
                            onPress={onDayPress.bind(this, weekdays[1], 1)}
                        >
                            <View
                                style={
                                    isCalendarReady &&
                                    isSelectedDate(weekdays[1])
                                        ? [
                                              styles.weekDayNumberCircle,
                                              { backgroundColor: 'red' }
                                          ]
                                        : {}
                                }
                            >
                                <Text
                                    style={
                                        isCalendarReady &&
                                        isSelectedDate(weekdays[1])
                                            ? styles.weekDayNumberTextToday
                                            : { color: props.themeColor }
                                    }
                                >
                                    {isCalendarReady ? weekdays[1].date() : ''}
                                </Text>
                            </View>
                            {isCalendarReady &&
                                eventMap.get(
                                    weekdays[1].format('YYYY-MM-DD').toString()
                                ) !== undefined && (
                                    <View
                                        style={
                                            isSelectedDate(weekdays[1])
                                                ? [
                                                      calendarStyle.dot,
                                                      {
                                                          backgroundColor:
                                                              'white'
                                                      }
                                                  ]
                                                : [
                                                      calendarStyle.dot,
                                                      { backgroundColor: 'red' }
                                                  ]
                                        }
                                    />
                                )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.weekDayNumber}
                            onPress={onDayPress.bind(this, weekdays[2], 2)}
                        >
                            <View
                                style={
                                    isCalendarReady &&
                                    isSelectedDate(weekdays[2])
                                        ? [
                                              styles.weekDayNumberCircle,
                                              { backgroundColor: 'red' }
                                          ]
                                        : {}
                                }
                            >
                                <Text
                                    style={
                                        isCalendarReady &&
                                        isSelectedDate(weekdays[2])
                                            ? styles.weekDayNumberTextToday
                                            : { color: props.themeColor }
                                    }
                                >
                                    {isCalendarReady ? weekdays[2].date() : ''}
                                </Text>
                            </View>
                            {isCalendarReady &&
                                eventMap.get(
                                    weekdays[2].format('YYYY-MM-DD').toString()
                                ) !== undefined && (
                                    <View
                                        style={
                                            isSelectedDate(weekdays[2])
                                                ? [
                                                      calendarStyle.dot,
                                                      {
                                                          backgroundColor:
                                                              'white'
                                                      }
                                                  ]
                                                : [
                                                      calendarStyle.dot,
                                                      { backgroundColor: 'red' }
                                                  ]
                                        }
                                    />
                                )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.weekDayNumber}
                            onPress={onDayPress.bind(this, weekdays[3], 3)}
                        >
                            <View
                                style={
                                    isCalendarReady &&
                                    isSelectedDate(weekdays[3])
                                        ? [
                                              styles.weekDayNumberCircle,
                                              { backgroundColor: 'red' }
                                          ]
                                        : {}
                                }
                            >
                                <Text
                                    style={
                                        isCalendarReady &&
                                        isSelectedDate(weekdays[3])
                                            ? styles.weekDayNumberTextToday
                                            : { color: props.themeColor }
                                    }
                                >
                                    {isCalendarReady ? weekdays[3].date() : ''}
                                </Text>
                            </View>
                            {isCalendarReady &&
                                eventMap.get(
                                    weekdays[3].format('YYYY-MM-DD').toString()
                                ) !== undefined && (
                                    <View
                                        style={
                                            isSelectedDate(weekdays[3])
                                                ? [
                                                      calendarStyle.dot,
                                                      {
                                                          backgroundColor:
                                                              'white'
                                                      }
                                                  ]
                                                : [
                                                      calendarStyle.dot,
                                                      { backgroundColor: 'red' }
                                                  ]
                                        }
                                    />
                                )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.weekDayNumber}
                            onPress={onDayPress.bind(this, weekdays[4], 4)}
                        >
                            <View
                                style={
                                    isCalendarReady &&
                                    isSelectedDate(weekdays[4])
                                        ? [
                                              styles.weekDayNumberCircle,
                                              { backgroundColor: 'red' }
                                          ]
                                        : {}
                                }
                            >
                                <Text
                                    style={
                                        isCalendarReady &&
                                        isSelectedDate(weekdays[4])
                                            ? styles.weekDayNumberTextToday
                                            : { color: props.themeColor }
                                    }
                                >
                                    {isCalendarReady ? weekdays[4].date() : ''}
                                </Text>
                            </View>
                            {isCalendarReady &&
                                eventMap.get(
                                    weekdays[4].format('YYYY-MM-DD').toString()
                                ) !== undefined && (
                                    <View
                                        style={
                                            isSelectedDate(weekdays[4])
                                                ? [
                                                      calendarStyle.dot,
                                                      {
                                                          backgroundColor:
                                                              'white'
                                                      }
                                                  ]
                                                : [
                                                      calendarStyle.dot,
                                                      { backgroundColor: 'red' }
                                                  ]
                                        }
                                    />
                                )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.weekDayNumber}
                            onPress={onDayPress.bind(this, weekdays[5], 5)}
                        >
                            <View
                                style={
                                    isCalendarReady &&
                                    isSelectedDate(weekdays[5])
                                        ? [
                                              styles.weekDayNumberCircle,
                                              { backgroundColor: 'red' }
                                          ]
                                        : {}
                                }
                            >
                                <Text
                                    style={
                                        isCalendarReady &&
                                        isSelectedDate(weekdays[5])
                                            ? styles.weekDayNumberTextToday
                                            : { color: props.themeColor }
                                    }
                                >
                                    {isCalendarReady ? weekdays[5].date() : ''}
                                </Text>
                            </View>
                            {isCalendarReady &&
                                eventMap.get(
                                    weekdays[5].format('YYYY-MM-DD').toString()
                                ) !== undefined && (
                                    <View
                                        style={
                                            isSelectedDate(weekdays[5])
                                                ? [
                                                      calendarStyle.dot,
                                                      {
                                                          backgroundColor:
                                                              'white'
                                                      }
                                                  ]
                                                : [
                                                      calendarStyle.dot,
                                                      { backgroundColor: 'red' }
                                                  ]
                                        }
                                    />
                                )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.weekDayNumber}
                            onPress={onDayPress.bind(this, weekdays[6], 6)}
                        >
                            <View
                                style={
                                    isCalendarReady &&
                                    isSelectedDate(weekdays[6])
                                        ? [
                                              styles.weekDayNumberCircle,
                                              { backgroundColor: 'red' }
                                          ]
                                        : {}
                                }
                            >
                                <Text
                                    style={
                                        isCalendarReady &&
                                        isSelectedDate(weekdays[6])
                                            ? styles.weekDayNumberTextToday
                                            : { color: props.themeColor }
                                    }
                                >
                                    {isCalendarReady ? weekdays[6].date() : ''}
                                </Text>
                            </View>
                            {isCalendarReady &&
                                eventMap.get(
                                    weekdays[6].format('YYYY-MM-DD').toString()
                                ) !== undefined && (
                                    <View
                                        style={
                                            isSelectedDate(weekdays[6])
                                                ? [
                                                      calendarStyle.dot,
                                                      {
                                                          backgroundColor:
                                                              'white'
                                                      }
                                                  ]
                                                : [
                                                      calendarStyle.dot,
                                                      { backgroundColor: 'red' }
                                                  ]
                                        }
                                    />
                                )}
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={clickNextWeekHandler}
                >
                    <Entypo name="chevron-right" size={24} color="red" />
                </TouchableOpacity>
            </View>
            {props.filterSelector && (
                <View style={styles.filterContainer}>
                    {props.filterSelector}
                </View>
            )}
            {props.events.length !== 0 && showTable && (
                <ScrollView
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                    overScrollMode="never"
                >
                    <View style={styles.schedule}>
                        {scheduleView !== undefined && scheduleView}
                    </View>
                </ScrollView>
            )}
            {props.events.length === 0 && (
                <EmptyItem header="Your event is empty this week." />
            )}
            {Platform.OS === 'ios' && (
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={isPickerVisible}
                    onRequestClose={() => setPickerVisible(false)} // for android only
                    style={styles.modal}
                >
                    <TouchableWithoutFeedback
                        onPress={() => setPickerVisible(false)}
                    >
                        <View style={styles.blurredArea} />
                    </TouchableWithoutFeedback>
                    <View style={styles.pickerButtons}>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setPickerVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={confirmPickerHandler.bind(
                                this,
                                pickerDate
                            )}
                        >
                            <Text style={styles.modalButtonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                    <DateTimePicker
                        locale={'en'}
                        value={pickerDate.toDate()}
                        onChange={pickerOnChange}
                        style={styles.picker}
                        display="spinner"
                        textColor="black"
                    />
                </Modal>
            )}
            {Platform.OS === 'android' && isPickerVisible && (
                <DateTimePicker
                    locale={'en'}
                    value={pickerDate.toDate()}
                    onChange={pickerOnChange}
                />
            )}
            {(!isCalendarReady || isLoading) && (
                <ActivityIndicator
                    size="large"
                    color="grey"
                    style={styles.indicator}
                />
            )}
        </View>
    );
};

WeeklyCalendar.defaultProps = {
    selected: moment(),
    startWeekday: 7,
    titleFormat: undefined,
    weekdayFormat: 'ddd',
    locale: 'en',
    events: [],
    themeColor: 'black',
    style: {},
    titleStyle: {},
    dayLabelStyle: {}
};

const styles = StyleSheet.create({
    component: {
        flex: 1
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10
    },
    arrowButton: {
        justifyContent: 'center'
    },
    monthTitle: {
        marginVertical: Platform.OS === 'ios' ? 5 : 0,
        fontSize: Platform.OS === 'ios' ? 27 : 25,
        color: 'black',
        fontFamily: 'ibm-bold'
    },
    week: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    weekDayDateLabelWrapper: {
        flex: 1
    },
    weekdayLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4
    },
    weekdayLabel: {
        flex: 1,
        alignItems: 'center'
    },
    weekdayLabelText: {
        color: 'gray'
    },
    weekdayNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    weekDayNumber: {
        flex: 1,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    weekDayNumberCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 30 / 2
    },
    weekDayNumberTextToday: {
        color: 'white',
        fontFamily: 'ibm-semibold'
    },
    schedule: {
        width: '100%',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 15,
        overflow: 'hidden'
    },
    filterContainer: {
        paddingVertical: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    pickerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    picker: {
        backgroundColor: '#fff',
        paddingBottom: 150
    },
    modal: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    blurredArea: {
        flex: 1,
        opacity: 0.7,
        backgroundColor: 'black'
    },
    modalButton: {
        padding: 15
    },
    modalButtonText: {
        fontSize: 20
    },
    indicator: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        position: 'absolute'
    },
    day: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderTopColor: 'gray',
        borderTopWidth: StyleSheet.hairlineWidth
    }
});

export default WeeklyCalendar;
