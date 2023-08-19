import React from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../../constants/Colors';

interface Props {
    children?: JSX.Element;
    style?: object;
}

const { height } = Dimensions.get('window');

const Header = (props: Props): JSX.Element => {
    return (
        <View style={styles.headerContainer}>
            <LinearGradient
                colors={Colors.linearGradient}
                style={styles.linearGradient}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
            >
                <StatusBar translucent={true} backgroundColor={'transparent'} />
                <View style={{ ...styles.headerContent, ...props.style }}>
                    {props.children}
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: height > 600 ? '35%' : '46%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden'
    },
    linearGradient: {
        flex: 1
    },
    headerContent: {
        flex: 1,
        marginLeft: height * 0.06,
        marginRight: height * 0.06,
        justifyContent: 'center'
    }
});

export default Header;
