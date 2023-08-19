import { createStackNavigator } from 'react-navigation-stack';

import AuthenticationScreen from '../screens/authentication/AuthenticationScreen';

const AuthenticationNavigator = createStackNavigator(
    {
        SignIn: AuthenticationScreen
    },
    {
        defaultNavigationOptions: {
            headerTransparent: true,
            headerTitle: ''
        }
    }
);

export default AuthenticationNavigator;
