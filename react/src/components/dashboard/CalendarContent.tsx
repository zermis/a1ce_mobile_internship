import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';
import { CalendarEvent } from '../../models/Calendar';

import CalendarDay from './CalendarDay';
import Ribbon from './Ribbon';

interface Props {
    todayEvents: CalendarEvent[] | null;
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const CalendarContent = (props: Props): JSX.Element => {
    return (
        <View>
            <Ribbon text="Today's Events" />
            {props.todayEvents?.length !== 0 && (
                <CalendarDay
                    todayEvents={props.todayEvents}
                    navigation={props.navigation}
                />
            )}
            {props.todayEvents?.length === 0 && (
                <View>
                    <Text style={styles.emptyEventText}>No event today</Text>
                </View>
            )}
        </View>
    );
};

export default CalendarContent;

const styles = StyleSheet.create({
    emptyEventText: {
        fontSize: 16,
        fontFamily: 'ibm-semibold',
        alignSelf: 'center'
    }
});
