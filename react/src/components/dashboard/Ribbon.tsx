import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

interface Props {
    text: string;
}

const Ribbon = (props: Props): JSX.Element => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.ribbon}>
                <Text style={styles.ribbonText}>{props.text}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30
    },
    ribbon: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        borderRadius: 25,
        backgroundColor: Colors.ribbonBackgroundColor
    },
    ribbonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'ibm-semibold',
        letterSpacing: 0.5
    }
});

export default Ribbon;
