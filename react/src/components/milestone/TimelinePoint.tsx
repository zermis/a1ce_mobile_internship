import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const Point = () => {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.outerContainer}></View>
            </View>
        </View>
    );
};

Point.defaultProps = {
    pointShadowColor: Colors.pointShadowColor,
    pointBackgroundColor: Colors.pointBackgroundColor,
    outerContainerBorderColor: Colors.pointBackgroundColor,
    outerContainerBackgroundColor: Colors.pointBackgroundColor
};

const styles = StyleSheet.create({
    container: {
        left: 50,
        bottom: 50
    },
    innerContainer: {
        left: -4,
        width: 10,
        height: 10,
        backgroundColor: Point.defaultProps.pointBackgroundColor,
        borderRadius: 30,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Point.defaultProps.pointShadowColor,
        shadowRadius: 8,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    outerContainer: {
        width: 20,
        height: 20,
        borderColor: Point.defaultProps.outerContainerBorderColor,
        borderWidth: 1,
        borderRadius: 16
    }
});

export default Point;
