import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
    NavigationInjectedProps,
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';

import FlexBetweenColumnSection from '../../components/detailScreen/FlexBetweenColumnSection';
import FlexBetweenRowSection from '../../components/detailScreen/FlexBetweenRowSection';
import SkillCard from '../../components/detailScreen/SkillCard';
import BackButton from '../../components/shared/BackButton';
import DefaultMainHeader from '../../components/shared/DefaultMainHeader';
import DetailBodyText from '../../components/shared/DetailBodyText';
import Colors from '../../constants/Colors';
import PageContainer from '../../containers/PageContainer';
import { compareCompetencyStatus } from '../../utils/SelectedColorStatus';
import { StudentCompetency } from '../../models/Student';
import { detailPageStyle } from '../../shared/Styles';

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const CompetencyDetailScreen = (props: Props): JSX.Element => {
    const studentCard: StudentCompetency =
        props.navigation.getParam('studentCard');

    const headerContent = (
        <DefaultMainHeader>
            {studentCard.title || 'Unknown Title'}
        </DefaultMainHeader>
    );

    const description = (
        <DetailBodyText>{studentCard.description || '-'}</DetailBodyText>
    );

    const credit = <DetailBodyText>{studentCard.credits}</DetailBodyText>;

    const status = (
        <View
            style={{
                ...detailPageStyle.ribbon,
                backgroundColor: compareCompetencyStatus(studentCard.status_val)
            }}
        >
            <Text style={detailPageStyle.ribbonText}>
                {studentCard.status || 'unknown'}
            </Text>
        </View>
    );

    const masteryLevel = (
        <DetailBodyText>{studentCard.mastery_level || '-'}</DetailBodyText>
    );

    const skill = (
        <SkillCard
            navigation={props.navigation}
            studentSkill={studentCard.skills}
            competencyTitle={studentCard.title}
        />
    );

    const bodyContent = (
        <ScrollView
            style={styles.screen}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
        >
            <>
                <FlexBetweenColumnSection
                    header="Description"
                    body={description}
                />
                <View style={detailPageStyle.lineSeparator} />
            </>

            <FlexBetweenRowSection header="Credit" body={credit} />

            <FlexBetweenRowSection header="Status" body={status} />

            {studentCard.mastery_level > 0 && (
                <FlexBetweenRowSection
                    header="Mastery Level"
                    body={masteryLevel}
                />
            )}

            <View style={detailPageStyle.lineSeparator} />
            {studentCard.skills && (
                <FlexBetweenColumnSection header="Skills" body={skill} />
            )}
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

CompetencyDetailScreen.navigationOptions = (
    navData: NavigationInjectedProps
) => {
    const subdomainTitle = navData.navigation.getParam('subdomainTitle');
    return {
        headerLeft: () => (
            <BackButton
                title={subdomainTitle}
                onPress={() => navData.navigation.goBack()}
            />
        )
    };
};
const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    statusText: {
        color: Colors.textBody,
        textAlign: 'justify',
        fontSize: 14,
        fontWeight: 'normal',
        lineHeight: 20
    }
});

export default CompetencyDetailScreen;
