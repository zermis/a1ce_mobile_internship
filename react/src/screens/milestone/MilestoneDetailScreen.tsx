import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import DefaultMainHeader from '../../components/shared/DefaultMainHeader';
import PageContainer from '../../containers/PageContainer';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';

import FlexBetweenColumnSection from '../../components/detailScreen/FlexBetweenColumnSection';
import DetailBodyText from '../../components/shared/DetailBodyText';
import Card from '../../components/competency/Card';
import FlexBetweenRowSection from '../../components/detailScreen/FlexBetweenRowSection';
import DetailDateText from '../../components/shared/DetailDateText';
import { compareMilestoneStatus } from '../../utils/SelectedColorStatus';
import { detailPageStyle } from '../../shared/Styles';
import { Milestone } from '../../models/Roadmap';
import moment from 'moment';

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const MilestoneDetailScreen = (props: Props): JSX.Element => {
    const milestoneCard: Milestone = props.navigation.getParam('milestoneCard');

    const headerContent = (
        <DefaultMainHeader>{milestoneCard.title}</DefaultMainHeader>
    );

    const status = (
        <View
            style={{
                ...detailPageStyle.ribbon,
                backgroundColor: compareMilestoneStatus(
                    milestoneCard.status_val
                )
            }}
        >
            <Text style={detailPageStyle.ribbonText}>
                {milestoneCard.status}
            </Text>
        </View>
    );

    const completionDate = (
        <View>
            <DetailDateText
                header="Expected Date:"
                body={milestoneCard.target_completion_date}
            />
            <View style={styles.dateLineHeight} />
            <DetailDateText
                header="Actual Date:"
                body={
                    milestoneCard.actual_completion_date ||
                    'Milestone In Progress'
                }
            />
        </View>
    );

    const description = (
        <DetailBodyText>{milestoneCard.description || '-'}</DetailBodyText>
    );

    const competency = (
        <Card
            style={styles.cardNoMargin}
            studentCard={milestoneCard.competency_card}
            navigation={props.navigation}
        />
    );

    const bodyContent = (
        <ScrollView
            style={styles.screen}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
        >
            <FlexBetweenRowSection
                header={`Created Date: ${moment(
                    milestoneCard.created,
                    'YYYY-MM-DD HH:mm:ss ZZ'
                ).format('YYYY/MM/DD')}`}
                body={status}
            />

            <FlexBetweenColumnSection
                header="Completion Date"
                body={completionDate}
            />

            <FlexBetweenColumnSection header="Description" body={description} />
            <View style={detailPageStyle.lineSeparator}></View>

            <FlexBetweenColumnSection header="Competency" body={competency} />
        </ScrollView>
    );

    return (
        <PageContainer
            isMain={false}
            headerContent={headerContent}
            bodyContent={bodyContent}
        ></PageContainer>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    cardNoMargin: {
        margin: 0
    },
    dateLineHeight: {
        marginTop: 5
    }
});

export default MilestoneDetailScreen;
