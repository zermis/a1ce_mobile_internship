import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

interface Props {
    children?: string | number;
    style?: object;
}

const DetailBodyText = (props: Props): JSX.Element => {
    return (
        <Text style={{ ...styles.textBody, ...props.style }}>
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    textBody: {
        fontFamily: 'ibm-regular',
        fontSize: 14,
        color: Colors.textBody,
        textAlign: 'justify',
        lineHeight: 20
    }
});

export default DetailBodyText;
