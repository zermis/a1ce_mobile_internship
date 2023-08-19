import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

const LoadingOverlay = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.loadingIcon} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24
    }
});

export default LoadingOverlay;
