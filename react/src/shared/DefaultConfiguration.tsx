import { Platform } from 'react-native';

const defaultNavigationOptions = {
    headerTransparent: true,
    headerTitle: '',
    safeAreaInsets:
        // Avoid unexpected jump when app first load from auth to home page in android
        Platform.OS === 'android' ? { top: 40 } : {}
};

export { defaultNavigationOptions };
