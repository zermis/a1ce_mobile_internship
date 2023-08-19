import { Entypo } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';
import { CalendarEvent } from '../../models/Calendar';
import { calendarStyle } from '../../shared/Styles';

interface Props {
    todayEvents: CalendarEvent[] | null;
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const CalendarDay = (props: Props) => {
    const eventViews = (
        <View>
            {props.todayEvents?.map((event: CalendarEvent, key: number) => (
                <React.Fragment key={key}>
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
                            <View style={calendarStyle.eventDuration}>
                                <View style={calendarStyle.durationContainer}>
                                    <View style={calendarStyle.durationDot} />
                                    <Text style={calendarStyle.durationText}>
                                        {event.start_time}
                                    </Text>
                                </View>
                                <View style={{ paddingTop: 10 }} />
                                <View style={calendarStyle.durationContainer}>
                                    <View style={calendarStyle.durationDot} />
                                    <Text style={calendarStyle.durationText}>
                                        {event.end_time}
                                    </Text>
                                </View>
                                <View
                                    style={calendarStyle.durationDotConnector}
                                />
                            </View>
                            <View style={calendarStyle.eventContainer}>
                                <Text style={calendarStyle.eventNote}>
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
                    <View style={calendarStyle.lineSeparator} />
                </React.Fragment>
            ))}
        </View>
    );

    return (
        <View style={styles.calendarShadow}>
            <View style={styles.calendarContainer}>
                <View style={styles.day}>
                    <View style={calendarStyle.dayLabel}>
                        <Text style={calendarStyle.monthDateText}>
                            {moment(new Date()).format('M/D').toString()}
                        </Text>
                        <Text style={calendarStyle.dayText}>
                            {moment(new Date()).format('ddd').toString()}
                        </Text>
                    </View>
                    <View style={[calendarStyle.allEvents]}>{eventViews}</View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    calendarShadow: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    calendarContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden'
    },
    day: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    }
});

export default CalendarDay;
