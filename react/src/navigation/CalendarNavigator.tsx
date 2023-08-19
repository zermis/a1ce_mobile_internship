import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import CalendarScreen from '../screens/calendar/CalendarScreen';
import ActivityDetailScreen from '../screens/calendar/ActivityDetailScreen';
import DrawerButton from '../components/shared/DrawerButton';
import BackButton from '../components/shared/BackButton';
import { defaultNavigationOptions } from '../shared/DefaultConfiguration';

const CalendarNavigator = createStackNavigator(
    {
        Calendar: {
            screen: CalendarScreen,
            navigationOptions: ({ navigation }: any) => ({
                headerLeft: () => (
                    <DrawerButton onPress={() => navigation.toggleDrawer()} />
                )
            })
        },
        ActivityDetail: {
            screen: ActivityDetailScreen,
            navigationOptions: ({ navigation }) => ({
                headerLeft: () => (
                    <BackButton
                        title="Calendar"
                        onPress={() => navigation.goBack()}
                    />
                )
            })
        }
    },
    {
        defaultNavigationOptions: defaultNavigationOptions
    }
);

export default CalendarNavigator;
