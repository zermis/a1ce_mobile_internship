import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Fontisto } from '@expo/vector-icons';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '../../constants/Colors';
import { _signInAsync } from '../../utils/GoogleOAuth';
import { SIGNIN_STATUS } from '../../constants/AuthenticationStatus';

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const AuthenticationScreen = (props: Props) => {
    const signIn = async () => {
        const signInStatus = await _signInAsync();

        switch (signInStatus) {
            case SIGNIN_STATUS.SUCCESS:
                props.navigation.navigate('App');
                break;
            case SIGNIN_STATUS.CANCEL:
            // if error do
        }
    };

    return (
        <LinearGradient
            colors={Colors.linearGradient}
            style={styles.gradient}
            start={{ x: 0.0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            accessibilityLabel="Authentication-Screen"
        >
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    onPress={() => void signIn()}
                    style={styles.button}
                    accessibilityLabel="Signin-Button"
                >
                    <Fontisto name="google" size={25} />
                    <Text
                        style={styles.buttonText}
                        accessibilityLabel="Signin-Button-Text"
                    >
                        Sign In with Google
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 20,
        color: '#000',
        alignItems: 'center',
        marginLeft: 15
    }
});

export default AuthenticationScreen;
