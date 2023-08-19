import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import DashboardScreen from '../screens/dashboard/DashboardScreen';
import DrawerButton from '../components/shared/DrawerButton';
import { defaultNavigationOptions } from '../shared/DefaultConfiguration';
import ActivityDetailScreen from '../screens/calendar/ActivityDetailScreen';
import BackButton from '../components/shared/BackButton';
import CompetencyDetailScreen from '../screens/competency/CompetencyDetailScreen';
import SkillDetailScreen from '../screens/competency/SkillDetailScreen';

const DashboardNavigator = createStackNavigator(
    {
        Dashboard: {
            screen: DashboardScreen,
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
                        title="Dashboard"
                        onPress={() => navigation.goBack()}
                    />
                )
            })
        },
        CompetencyDetail: {
            screen: CompetencyDetailScreen,
            navigationOptions: ({ navigation }) => ({
                headerLeft: () => (
                    <BackButton
                        title="Dashboard"
                        onPress={() => navigation.goBack()}
                    />
                )
            })
        },
        SkillDetail: {
            screen: SkillDetailScreen
        }
    },
    {
        defaultNavigationOptions: defaultNavigationOptions
    }
);

export default DashboardNavigator;
