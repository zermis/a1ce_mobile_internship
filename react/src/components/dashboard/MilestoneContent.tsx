import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';

import Ribbon from './Ribbon';
import Timeline from '../milestone/Timeline';
import { Roadmap } from '../../models/Roadmap';
import { FormatYearSemester } from '../../models/UniversitySemester';

interface Props {
    roadmap: Roadmap;
    semester: FormatYearSemester;
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    selectedYear: string;
    selectedSemester: string;
    isMilestonePage: boolean;
    setSelectedYear: (year: string) => void;
    setSelectedSemester: (semester: string) => void;
}

const MilestoneContent = (props: Props): JSX.Element => {
    return (
        <>
            <Ribbon text="Current Milestone" />
            <View style={styles.timeline}>
                <Timeline
                    roadmap={props.roadmap}
                    navigation={props.navigation}
                    isMilestonePage={props.isMilestonePage}
                />
            </View>
        </>
    );
};

MilestoneContent.defaultProps = {
    data: [],
    isMilestonePage: false
};

const styles = StyleSheet.create({
    timeline: {
        padding: 20
    }
});

export default MilestoneContent;
