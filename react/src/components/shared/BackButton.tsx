import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Props {
    onPress: () => void;
    title?: string;
}

const BackButton = (props: Props): JSX.Element => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Feather name="arrow-left" size={22} color="white" />
            <View style={styles.textContainer}>
                <Text style={styles.text}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        zIndex: 1
    },
    textContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: Dimensions.get('window').width * 0.8
    },
    text: {
        fontFamily: 'ibm-medium',
        fontSize: 18,
        marginLeft: 10,
        color: 'white',
        opacity: 0.5
    }
});

export default BackButton;
