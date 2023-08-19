import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Dimensions,
    FlatList,
    SafeAreaView,
    View
} from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';

import TimelineItem from './TimelineItem';
import Colors from '../../constants/Colors';
import { Milestone, Roadmap } from '../../models/Roadmap';

interface Props {
    roadmap: Roadmap;
    isMilestonePage: boolean;
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const { width, height } = Dimensions.get('window');

type dataType = {
    date: string;
    data: Milestone[];
};

const sortRoadmapMilestone = (roadmap: Roadmap): Roadmap => {
    const result = roadmap.milestones.sort(
        (b, a) =>
            new Date(b.target_completion_date).getTime() -
            new Date(a.target_completion_date).getTime()
    );

    roadmap.milestones = result;

    return roadmap;
};

const Timeline = (props: Props) => {
    const [roadmapData, setRoadmapData] = useState<dataType[]>([
        { date: '', data: [] }
    ]);

    useEffect(() => {
        const sortedRoadmap = sortRoadmapMilestone(props.roadmap);
        const formatRoadmapData = getRoadmapData(sortedRoadmap);
        setRoadmapData(formatRoadmapData);
    }, []);

    const getRoadmapData = (roadmap: Roadmap) => {
        const data: dataType[] = [{ date: '', data: [] }];

        for (let i = 0; i < roadmap.milestones.length; i++) {
            let isAdded = false;

            for (let j = 0; data.length; j++) {
                if (data[j] !== undefined) {
                    if (
                        data[j].date.includes(
                            roadmap.milestones[i].target_completion_date
                        )
                    ) {
                        isAdded = true;
                        data[j].data.push({
                            title: roadmap.milestones[i].title,
                            description: roadmap.milestones[i].description,
                            target_completion_date:
                                roadmap.milestones[i].target_completion_date,
                            actual_completion_date:
                                roadmap.milestones[i].actual_completion_date,
                            created: roadmap.milestones[i].created,
                            status: roadmap.milestones[i].status,
                            status_val: roadmap.milestones[i].status_val,
                            id: roadmap.milestones[i].id,
                            competency_card:
                                roadmap.milestones[i].competency_card
                        });
                    }
                } else {
                    break;
                }
            }
            if (!isAdded) {
                data.push({
                    date: roadmap.milestones[i].target_completion_date,
                    data: [
                        {
                            title: roadmap.milestones[i].title,
                            description: roadmap.milestones[i].description,
                            target_completion_date:
                                roadmap.milestones[i].target_completion_date,
                            actual_completion_date:
                                roadmap.milestones[i].actual_completion_date,
                            created: roadmap.milestones[i].created,
                            status: roadmap.milestones[i].status,
                            status_val: roadmap.milestones[i].status_val,
                            id: roadmap.milestones[i].id,
                            competency_card:
                                roadmap.milestones[i].competency_card
                        }
                    ]
                });
            }
        }
        data.shift();

        return data;
    };

    const renderItem = (item: dataType, index: number) => {
        const isLastMember = props.isMilestonePage
            ? index === roadmapData.length - 1
            : true;

        return (
            <TimelineItem
                {...props}
                key={index}
                date={item.date}
                list={item.data}
                isLastMember={isLastMember}
                isMilestonePage={props.isMilestonePage}
            />
        );
    };

    let milestoneList;
    if (props.isMilestonePage) {
        milestoneList = (
            <FlatList
                data={roadmapData}
                style={styles.listStyle}
                overScrollMode="never"
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => renderItem(item, index)}
                ListFooterComponent={<View style={{ height: height * 0.47 }} />}
                showsVerticalScrollIndicator={false}
            />
        );
    } else {
        const dashboardMilestone =
            roadmapData.length > 0 ? roadmapData[0] : { date: '', data: [] };

        milestoneList = renderItem(dashboardMilestone, 0);
    }

    return (
        <SafeAreaView style={styles.container}>{milestoneList}</SafeAreaView>
    );
};

Timeline.defaultProps = {
    data: [],
    isScrollRequired: true
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundColor
    },
    listStyle: {
        width: width,
        height: height,
        marginTop: 10
    }
});

export default Timeline;
