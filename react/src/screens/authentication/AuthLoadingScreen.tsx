import React from 'react';
import { ActivityIndicator, StyleSheet, View, StatusBar } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';

import TokenKey from '../../constants/TokenKey';

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const AuthLoadingScreen = (props: Props) => {
    // Fetch token from storage then navigate to our appropriate place
    const _validateToken = async () => {
        const userToken = await SecureStore.getItemAsync(TokenKey.userToken);
        // This will switch to the App screen or Auth screen
        // This loading screen will be unmounted and thrown away
        props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    void _validateToken();

    return (
        <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default AuthLoadingScreen;
