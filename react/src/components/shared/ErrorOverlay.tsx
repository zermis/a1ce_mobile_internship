import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import Colors from '../../constants/Colors';
import ERROR_MESSAGE from '../../constants/ErrorMessage';

interface Props {
    message: string;
    onPressTryAgain: () => void;
    onPressOffline: () => void;
}

const height = Dimensions.get('window').height;

const ErrorOverlay = (props: Props): JSX.Element => {
    const isOnlineError = props.message.includes(
        ERROR_MESSAGE.ONLINE_FETCHING_ERROR
    );
    const descriptionText = isOnlineError
        ? 'Please check your connection\nand Try Again or Go Offline'
        : 'Offline Mode is not available';
    const buttonText = isOnlineError ? 'Try Again' : 'Try Online';

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../../assets/images/warning.png')}
                ></Image>
            </View>
            <Text style={styles.titleText}> Oops! Something Went Wrong </Text>
            <Text style={styles.descriptionText} numberOfLines={2}>
                {descriptionText}
            </Text>
            <TouchableOpacity
                style={styles.tryAgainButton}
                onPress={props.onPressTryAgain}
            >
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
            {isOnlineError && (
                <TouchableOpacity
                    style={styles.offlineButton}
                    onPress={props.onPressOffline}
                >
                    <Text style={styles.buttonText}>Go Offline</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 0.35 * height,
        height: height,
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    titleText: {
        color: Colors.primaryTextColor,
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
        bottom: 110
    },
    descriptionText: {
        color: Colors.errorDescriptionColor,
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center',
        lineHeight: 20,
        bottom: 90
    },
    imageContainer: {
        bottom: 250,
        height: 80,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    image: {
        marginTop: 50,
        height: 150,
        width: 150,
        alignSelf: 'center',
        position: 'absolute'
    },
    tryAgainButton: {
        height: 45,
        width: 290,
        borderRadius: 70,
        marginVertical: 30,
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 85,
        backgroundColor: Colors.tryAgainButton
    },
    offlineButton: {
        height: 45,
        width: 290,
        borderRadius: 70,
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 100,
        backgroundColor: Colors.goOfflineButton
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default ErrorOverlay;
