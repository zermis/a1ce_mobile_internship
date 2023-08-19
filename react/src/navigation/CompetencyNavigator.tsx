import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import CompetencyScreen from '../screens/competency/CompetencyScreen';
import CompetencyListScreen from '../screens/competency/CompetencyListScreen';
import CompetencyDetailScreen from '../screens/competency/CompetencyDetailScreen';
import DrawerButton from '../components/shared/DrawerButton';
import BackButton from '../components/shared/BackButton';
import { defaultNavigationOptions } from '../shared/DefaultConfiguration';
import SkillDetailScreen from '../screens/competency/SkillDetailScreen';

const CompetencyNavigator = createStackNavigator(
    {
        Competency: {
            screen: CompetencyScreen,
            navigationOptions: ({ navigation }: any) => ({
                headerLeft: () => (
                    <DrawerButton onPress={() => navigation.toggleDrawer()} />
                )
            })
        },
        CompetencyList: {
            screen: CompetencyListScreen,
            navigationOptions: ({ navigation }) => ({
                headerLeft: () => (
                    <BackButton
                        title="Competency Categories"
                        onPress={() => navigation.goBack()}
                    />
                )
            })
        },
        CompetencyDetail: {
            screen: CompetencyDetailScreen
        },
        SkillDetail: {
            screen: SkillDetailScreen
        }
    },
    {
        defaultNavigationOptions: defaultNavigationOptions
    }
);

export default CompetencyNavigator;
