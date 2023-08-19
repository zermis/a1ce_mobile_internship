import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';

interface Props {
    header?: string;
    body?: string;
}

const DetailDateText = (props: Props) => {
    return (
        <View style={styles.flexBetweenInnerContainer}>
            <Text style={styles.textSubHeader}>{props.header}</Text>
            <Text style={styles.textBody}>{props.body}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    flexBetweenInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative'
    },
    textSubHeader: {
        fontSize: 14,
        fontFamily: 'ibm-semibold',
        color: Colors.date
    },
    textBody: {
        textAlign: 'justify',
        fontSize: 14,
        fontFamily: 'ibm-regular',
        color: Colors.textBody
    }
});

export default DetailDateText;
