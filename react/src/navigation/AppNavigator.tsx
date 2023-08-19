import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Colors from '../constants/Colors';
import BottomTabNavigator from './BottomTabNavigator';
import CustomSidebar from '../components/sidebar/CustomSidebar';
import { Entypo } from '@expo/vector-icons';
import { drawerStyle } from '../shared/Styles';

const AppNavigator = createDrawerNavigator(
    {
        HomePage: {
            screen: BottomTabNavigator,
            navigationOptions: {
                drawerIcon: (drawerConfig) => (
                    <Entypo
                        name="home"
                        size={23}
                        color={drawerConfig.tintColor}
                    />
                ),
                drawerLabel: 'Home'
            }
        }
    },
    {
        edgeWidth: 0,
        contentComponent: CustomSidebar,
        contentOptions: {
            activeTintColor: Colors.activeTabColor,
            inactiveTintColor: Colors.inactiveTabColor,
            labelStyle: drawerStyle.font,
            iconContainerStyle: drawerStyle.icon
        }
    }
);

export default AppNavigator;
