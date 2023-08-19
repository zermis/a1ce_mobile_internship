import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

interface Props {
    children?: JSX.Element;
    style?: object;
    accessibilityLabel?: string;
}

const Body = (props: Props): JSX.Element => {
    return (
        <View
            style={{ ...styles.container, ...props.style }}
            accessibilityLabel={props.accessibilityLabel}
        >
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bodyColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -70
    }
});

export default Body;
