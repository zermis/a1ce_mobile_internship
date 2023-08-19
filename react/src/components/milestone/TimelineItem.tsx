import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';
import TimelineCard from './TimelineCard';
import PointLine from './TimelinePointLine';

interface Props {
    date: any;
    list: any;
    isLastMember: boolean;
    isCard: boolean;
    isMilestonePage: boolean;
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const TimelineItem = (props: Props) => {
    const renderItem = (item: any, index: number) => {
        return <TimelineCard {...props} key={index} isCard data={item} />;
    };

    const renderListStyle = !props.isMilestonePage ? { marginLeft: 5 } : {};
    const renderMilestoneList = props.isMilestonePage ? (
        <FlatList
            data={props.list}
            renderItem={({ item, index }) => renderItem(item, index)}
            keyExtractor={(_, index) => index.toString()}
        />
    ) : (
        // For milstone on dashboard page
        props.list.map((item: any, index: number) => {
            return renderItem(item, index);
        })
    );

    return (
        <View style={styles.container}>
            <PointLine
                {...props}
                data={props.date}
                length={props.list.length}
                isLastMember={props.isLastMember}
            />
            <View style={{ ...renderListStyle }}>{renderMilestoneList}</View>
        </View>
    );
};

TimelineItem.defaultProps = {
    data: {},
    list: [],
    isCard: TimelineCard.defaultProps.isCard
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default TimelineItem;
