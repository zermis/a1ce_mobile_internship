import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

interface Props {
    status: number;
}

// This JSX.Element will be used in detail screen later on
const RibbonStatus = (props: Props): JSX.Element => {
    return (
        <View
            style={[
                styles.ribbon,
                props.status === 3 // Change later on after we refactor the code
                    ? { backgroundColor: 'orange' }
                    : { backgroundColor: 'green' }
            ]}
        >
            <Text style={styles.ribbonText}>{props.status}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    ribbon: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        height: 24
    },
    ribbonText: {
        color: '#FFF',
        fontSize: 11
    }
});

export default RibbonStatus;
