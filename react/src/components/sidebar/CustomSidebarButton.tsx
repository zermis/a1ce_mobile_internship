import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { drawerStyle } from '../../shared/Styles';

interface Props {
    onPress: () => void;
    title: string;
    icon: JSX.Element;
}

const CustomSidebarButton = (props: Props): JSX.Element => {
    return (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={props.onPress}
        >
            <View style={styles.buttonInfo}>
                <View style={styles.iconContainer}>
                    <View style={drawerStyle.icon}>{props.icon}</View>
                </View>
                <View style={styles.textContainer}>
                    <Text style={drawerStyle.font}>{props.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        height: 56,
        justifyContent: 'center'
    },
    buttonInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 13
    },
    iconContainer: {
        marginLeft: 4
    }
});

export default CustomSidebarButton;
