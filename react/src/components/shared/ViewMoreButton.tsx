import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';

interface Props {
    onNavigate: NavigationScreenProp<NavigationState, NavigationParams>;
    length: number;
}

const ViewMoreButton = (props: Props): JSX.Element => {
    return props.length > 10 ? (
        <TouchableOpacity
            style={styles.container}
            onPress={() =>
                props.onNavigate.navigate({
                    routeName: 'Competency'
                })
            }
        >
            <Entypo name="chevron-with-circle-right" size={32} color="red" />
            <Text style={styles.text}>View more</Text>
        </TouchableOpacity>
    ) : (
        <View></View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        color: 'red'
    }
});

export default ViewMoreButton;
