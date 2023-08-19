import React from 'react';
import { Text, StyleSheet, Platform, Dimensions } from 'react-native';

interface Props {
    children?: string;
    style?: object;
}

const DefaultMainHeader = (props: Props) => {
    return (
        <Text style={{ ...styles.title, ...props.style }}>
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: Dimensions.get('window').height * 0.045,
        fontWeight: Platform.OS === 'ios' ? '600' : '700',
        letterSpacing: -0.5
    }
});

export default DefaultMainHeader;
