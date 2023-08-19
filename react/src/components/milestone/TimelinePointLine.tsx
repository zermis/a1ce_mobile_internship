import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import moment from 'moment';
import Dash from 'react-native-dash';
import Point from './TimelinePoint';
import Colors from '../../constants/Colors';

interface Props {
    data: any;
    isLastMember: boolean;
    length: number;
}

const PointLine = (props: Props) => {
    const dashStyle = (): ViewStyle => ({
        width: 1,
        height: 95 * props.length,
        flexDirection: 'column',
        left: 50,
        bottom: 30
    });

    return (
        <View>
            <View style={styles.containerGlue}>
                <Text style={styles.dayTextStyle}>
                    {moment(props.data).format('D/M')}
                </Text>
                <Text style={styles.monthTextStyle}>
                    {moment(props.data).format('ddd').toUpperCase()}
                </Text>
            </View>
            <View style={styles.dividerStyle}>
                <Point />
                {!props.isLastMember && (
                    <Dash
                        dashGap={5}
                        dashColor="#c4c4c4"
                        style={dashStyle()}
                        dashLength={8}
                        dashThickness={0.5}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerGlue: {
        height: 60,
        alignItems: 'center',
        flexDirection: 'column'
    },
    dividerStyle: {
        marginLeft: 20,
        marginRight: 30,
        marginBottom: -23
    },
    monthTextStyle: {
        color: Colors.monthTextColor,
        fontWeight: '600'
    },
    dayTextStyle: {
        color: Colors.primaryTextColor,
        fontWeight: '700'
    }
});

export default PointLine;
