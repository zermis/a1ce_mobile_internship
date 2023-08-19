import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthenticationNavigator from './AuthenticationNavigator';
import AuthLoadingScreen from '../screens/authentication/AuthLoadingScreen';
import AppNavigator from './AppNavigator';

const MainNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppNavigator,
        Auth: AuthenticationNavigator
    },
    {
        initialRouteName: 'AuthLoading'
    }
);

export default createAppContainer(MainNavigator);
