import moment from 'moment';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
    NavigationInjectedProps,
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';
import FlexBetweenColumnSection from '../../components/detailScreen/FlexBetweenColumnSection';
import FlexBetweenRowSection from '../../components/detailScreen/FlexBetweenRowSection';
import BackButton from '../../components/shared/BackButton';
import DefaultMainHeader from '../../components/shared/DefaultMainHeader';
import DetailBodyText from '../../components/shared/DetailBodyText';
import DetailLinkText from '../../components/shared/DetailLinkText';
import PageContainer from '../../containers/PageContainer';
import { StudentSkill } from '../../models/Student';
import { detailPageStyle } from '../../shared/Styles';

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SkillDetailScreen = (props: Props): JSX.Element => {
    const studentSkill: StudentSkill =
        props.navigation.getParam('studentSkill');

    const headerContent = (
        <DefaultMainHeader>{studentSkill.title}</DefaultMainHeader>
    );

    const descriptionSkill = (
        <DetailBodyText>{studentSkill.description || '-'}</DetailBodyText>
    );

    const assessmentTitle = (
        <DetailBodyText>{studentSkill.assessment.title}</DetailBodyText>
    );

    const assessmentDescription = (
        <DetailBodyText>
            {studentSkill.assessment.description || '-'}
        </DetailBodyText>
    );

    const assessmentResult = (
        <DetailBodyText>{studentSkill.assessment.result}</DetailBodyText>
    );

    const assessmentTime = (
        <DetailBodyText>
            {moment(
                studentSkill.assessment.assessment_time,
                'YYYY-MM-DD HH:mm:ss ZZ'
            ).format('YYYY/MM/DD - HH:mm')}
        </DetailBodyText>
    );

    const urlLink = (
        <DetailLinkText>{studentSkill.assessment.external_url}</DetailLinkText>
    );

    const bodyContent = (
        <ScrollView
            style={styles.screen}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
        >
            <>
                <FlexBetweenColumnSection
                    header="Skill Description"
                    body={descriptionSkill}
                />
                <View style={detailPageStyle.lineSeparator}></View>
            </>

            <FlexBetweenColumnSection
                header="Assessment"
                style={styles.titleText}
                body={assessmentTitle}
            />

            <FlexBetweenColumnSection
                header="Assessment Description"
                body={assessmentDescription}
            />

            {studentSkill.assessment.result > 0 && (
                <FlexBetweenRowSection
                    header="Result"
                    body={assessmentResult}
                />
            )}

            {studentSkill.assessment.assessment_time !== '' && (
                <FlexBetweenRowSection
                    header="Assessment Time"
                    body={assessmentTime}
                />
            )}

            {studentSkill.assessment.external_url !== '' && (
                <FlexBetweenColumnSection header="Link" body={urlLink} />
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

SkillDetailScreen.navigationOptions = (navData: NavigationInjectedProps) => {
    const competencyTitle = navData.navigation.getParam('competencyTitle');
    return {
        headerLeft: () => (
            <BackButton
                title={competencyTitle}
                onPress={() => navData.navigation.goBack()}
            />
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    titleText: {
        color: '#B52B37',
        fontSize: 18
    }
});

export default SkillDetailScreen;
