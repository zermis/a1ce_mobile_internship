import React from 'react';
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Feather, AntDesign } from '@expo/vector-icons';

import DashboardNavigator from './DashboardNavigator';
import MilestoneNavigator from './MilestoneNavigator';
import CalendarNavigator from './CalendarNavigator';
import CompetencyNavigator from './CompetencyNavigator';

import Colors from '../constants/Colors';

const iconSize = 22;
const windowWidth = Dimensions.get('window').width;

// Footer tab navigation bar
const BottomTabNavigator = createBottomTabNavigator(
    {
        Dashboard: {
            screen: DashboardNavigator,
            navigationOptions: {
                tabBarAccessibilityLabel: 'Dashboard-Tab',
                tabBarIcon: (tabInfo) => {
                    return (
                        <Feather
                            name="home"
                            size={iconSize}
                            color={tabInfo.tintColor}
                        />
                    );
                }
            }
        },
        Milestone: {
            screen: MilestoneNavigator,
            navigationOptions: {
                tabBarAccessibilityLabel: 'Milestone-Tab',
                tabBarIcon: (tabInfo) => {
                    return (
                        <AntDesign
                            name="book"
                            size={iconSize}
                            color={tabInfo.tintColor}
                        />
                    );
                }
            }
        },
        Calendar: {
            screen: CalendarNavigator,
            navigationOptions: {
                tabBarAccessibilityLabel: 'Calendar-Tab',
                tabBarIcon: (tabInfo) => {
                    return (
                        <Feather
                            name="calendar"
                            size={iconSize}
                            color={tabInfo.tintColor}
                        />
                    );
                }
            }
        },
        Competency: {
            screen: CompetencyNavigator,
            navigationOptions: {
                tabBarAccessibilityLabel: 'Competency-Tab',
                tabBarIcon: (tabInfo) => {
                    return (
                        <Feather
                            accessibilityLabel="competencyButton"
                            name="target"
                            size={iconSize}
                            color={tabInfo.tintColor}
                        />
                    );
                }
            }
        }
    },
    {
        initialRouteName: 'Dashboard',
        tabBarOptions: {
            activeTintColor: Colors.activeTabColor,
            tabStyle: {
                paddingTop: windowWidth < 500 ? 11 : 0,
                flexDirection: windowWidth < 500 ? 'column' : 'row'
            },
            style: {
                height: 62,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                shadowOpacity: 0.7,
                shadowRadius: 16.0,
                shadowOffset: {
                    width: 0,
                    height: 14
                },
                elevation: 24
            },
            labelStyle: {
                marginTop: windowWidth < 500 ? 5 : 0,
                marginBottom: windowWidth < 500 ? 6 : 0
            }
        }
    }
);

export default BottomTabNavigator;
