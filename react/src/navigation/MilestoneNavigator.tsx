import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import MilestoneScreen from '../screens/milestone/MilestoneScreen';
import MilestoneDetailScreen from '../screens/milestone/MilestoneDetailScreen';
import { defaultNavigationOptions } from '../shared/DefaultConfiguration';
import BackButton from '../components/shared/BackButton';
import DrawerButton from '../components/shared/DrawerButton';
import CompetencyDetailScreen from '../screens/competency/CompetencyDetailScreen';
import SkillDetailScreen from '../screens/competency/SkillDetailScreen';

const MilestoneNavigator = createStackNavigator(
    {
        Milestone: {
            screen: MilestoneScreen,
            navigationOptions: ({ navigation }: any) => ({
                headerLeft: () => (
                    <DrawerButton onPress={() => navigation.toggleDrawer()} />
                )
            })
        },
        MilestoneDetail: {
            screen: MilestoneDetailScreen,
            navigationOptions: ({ navigation }) => ({
                headerLeft: () => (
                    <BackButton
                        title="Milestones"
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
                        title="Milestone detail"
                        onPress={() => navigation.goBack()}
                    />
                )
            })
        },
        SkillDetail: {
            screen: SkillDetailScreen,
            navigationOptions: ({ navigation }) => ({
                headerLeft: () => (
                    <BackButton
                        title="Competency detail"
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

export default MilestoneNavigator;
