import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Colors from '../../constants/Colors';

interface Props {
    children: string;
    style?: object;
}

const DetailLinkText = (props: Props) => {
    return (
        <TouchableOpacity
            style={styles.unorderedList}
            onPress={() => void Linking.openURL(props.children)}
        >
            <Text style={styles.bulletPoint}>{'\u2022'}</Text>
            <Text style={styles.textLink}>{props.children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    unorderedList: {
        flexDirection: 'row'
    },
    bulletPoint: {
        color: Colors.textLink,
        fontSize: 16
    },
    textLink: {
        flex: 1,
        paddingLeft: 5,
        color: Colors.textLink,
        fontFamily: 'ibm-regular',
        fontSize: 14,
        textDecorationLine: 'underline'
    }
});

export default DetailLinkText;
