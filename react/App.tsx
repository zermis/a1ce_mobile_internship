import React from 'react';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';

import MainNavigator from './src/navigation/MainNavigator';
import { Store } from './src/stores/Store';

// Optimize memory usage and performance, reference: https://reactnavigation.org/docs/5.x/react-native-screens/
enableScreens();

const fetchFonts = async () => {
    await Font.loadAsync({
        'ibm-light': require('./src/assets/fonts/IBMPlexSans-Light.ttf'),
        'ibm-regular': require('./src/assets/fonts/IBMPlexSans-Regular.ttf'),
        'ibm-medium': require('./src/assets/fonts/IBMPlexSans-Medium.ttf'),
        'ibm-semibold': require('./src/assets/fonts/IBMPlexSans-SemiBold.ttf'),
        'ibm-bold': require('./src/assets/fonts/IBMPlexSans-Bold.ttf')
    });
};

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFontLoaded(true)}
                onError={(err) => console.log(err)}
            />
        );
    }

    return (
        <Provider store={Store}>
            <SafeAreaProvider>
                <MainNavigator />
            </SafeAreaProvider>
        </Provider>
    );
}
