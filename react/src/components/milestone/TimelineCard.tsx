import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextStyle,
    Dimensions
} from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';

import moment from 'moment';
import Colors from '../../constants/Colors';
import { Milestone } from '../../models/Roadmap';

interface Props {
    isCard: boolean;
    shadowColor: string;
    dateFontColor: string;
    titleFontColor: string;
    subtitleFontColor: string;
    cardBackgroundColor: string;
    data: any;
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const width = Dimensions.get('window').width;

const TimelineCard = (props: Props) => {
    const [dayRemaining, setDayRemaining] = useState<number>(0);
    const targetDate = props.data.target_completion_date;

    useEffect(() => {
        countDayRemaining(targetDate);
    }, [targetDate]);

    const countDayRemaining = (targetDate: any) => {
        const given = moment(targetDate, 'YYYY-MM-DD');
        const current = moment().startOf('day');
        const days =
            moment.duration(given.diff(current)).asDays() > 0
                ? moment.duration(given.diff(current)).asDays()
                : 0;
        setDayRemaining(days);
    };

    return (
        <TouchableOpacity
            onPress={() => {
                props.navigation.navigate({
                    routeName: 'MilestoneDetail',
                    params: {
                        cardId: props.data.id,
                        milestoneCard: props.data
                    }
                });
            }}
        >
            <View style={styles.cardContainer}>
                <Text numberOfLines={1} style={styles.titleStyle}>
                    {props.data.title}
                </Text>
                <Text numberOfLines={2} style={styles.subtitleStyle}>
                    {props.data.description || 'No description'}
                </Text>
            </View>
            <View style={styles.description}>
                <Text numberOfLines={1} style={dateStyle(props.isCard)}>
                    Date: {targetDate}
                </Text>
                <Text numberOfLines={1} style={styles.dayRemaining}>
                    Day Remaining: {dayRemaining}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

TimelineCard.defaultProps = {
    isCard: true,
    shadowColor: Colors.shadowColor,
    dateFontColor: Colors.dateFontColor,
    titleFontColor: Colors.primaryTextColor,
    cardBackgroundColor: Colors.cardBackgroundColor,
    subtitleFontColor: Colors.subtitleFontColor
};

const dateStyle = (isCard: any): TextStyle => ({
    color: Colors.primaryTextColor,
    fontSize: 10,
    fontWeight: '300',
    marginTop: isCard ? 8 : 0,
    paddingLeft: 51
});

const styles = StyleSheet.create({
    dayRemaining: {
        color: Colors.primaryTextColor,
        fontSize: 10,
        marginRight: 8,
        fontWeight: '300',
        marginTop: 8
    },
    description: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 11
    },
    subtitleStyle: {
        color: Colors.subtitleFontColor,
        fontSize: 12,
        marginTop: 8,
        fontWeight: '600'
    },
    titleStyle: {
        color: Colors.primaryTextColor,
        fontSize: 14,
        fontWeight: 'bold'
    },
    shadowStyle: {
        backgroundColor: 'transparent',
        shadowColor: Colors.shadowColor,
        shadowRadius: 7,
        shadowOpacity: 0.09,
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    cardContainer: {
        width: width >= 500 ? width * 0.7 : 220,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 50,
        borderRadius: 12,
        flexDirection: 'column',
        justifyContent: 'center',
        shadowColor: Colors.shadowColor,
        backgroundColor: Colors.cardBackgroundColor,
        shadowRadius: 7,
        shadowOpacity: 0.05,
        shadowOffset: {
            width: 0,
            height: 3
        }
    }
});

export default TimelineCard;
