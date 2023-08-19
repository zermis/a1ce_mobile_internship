import moment from 'moment';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';

import FlexBetweenColumnSection from '../../components/detailScreen/FlexBetweenColumnSection';
import FlexBetweenSection from '../../components/detailScreen/FlexBetweenRowSection';
import DefaultMainHeader from '../../components/shared/DefaultMainHeader';
import DetailBodyText from '../../components/shared/DetailBodyText';
import DetailLinkText from '../../components/shared/DetailLinkText';
import DetailUnorderedListText from '../../components/shared/DetailUnorderedListText';
import Colors from '../../constants/Colors';
import PageContainer from '../../containers/PageContainer';
import { CalendarEvent } from '../../models/Calendar';
import { detailPageStyle } from '../../shared/Styles';

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const ActivityDetailScreen = (props: Props): JSX.Element => {
    const calendarEvent: CalendarEvent =
        props.navigation.getParam('calendarEvent');

    const calendarDatetime = `${String(
        moment(calendarEvent.date).format('MMMM DD, YYYY')
    )} at ${String(calendarEvent.start_time)} - ${String(
        calendarEvent.end_time
    )}`;

    const headerContent = (
        <DefaultMainHeader>{calendarEvent.title}</DefaultMainHeader>
    );

    const eventDateTime = (
        <DetailBodyText style={styles.textDate}>
            {calendarDatetime}
        </DetailBodyText>
    );
    const eventDescription = (
        <DetailBodyText>{calendarEvent.description || '-'}</DetailBodyText>
    );

    const eventType = (
        <DetailBodyText>{calendarEvent.event_type}</DetailBodyText>
    );

    const eventResponsible = (
        <DetailBodyText>{calendarEvent.responsible_person}</DetailBodyText>
    );

    const eventUrlLink = <DetailLinkText>{calendarEvent.url}</DetailLinkText>;

    const related_competencies = (
        <DetailUnorderedListText
            relatedCompetencies={calendarEvent.related_competencies}
        />
    );

    const bodyContent = (
        <ScrollView
            style={styles.screen}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
        >
            {eventDateTime}

            <FlexBetweenColumnSection
                header="Description"
                body={eventDescription}
            />

            <View style={detailPageStyle.lineSeparator}></View>

            <FlexBetweenSection header="Type" body={eventType} />

            <FlexBetweenSection
                header="Responsible Person"
                body={eventResponsible}
            />

            {calendarEvent.url !== '' && (
                <FlexBetweenColumnSection header="Link" body={eventUrlLink} />
            )}

            {calendarEvent.related_competencies.length > 0 && (
                <FlexBetweenColumnSection
                    header="Related Competencies"
                    body={related_competencies}
                />
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

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    textDate: {
        marginTop: 15,
        marginBottom: 4,
        fontSize: 18,
        fontFamily: 'ibm-semibold',
        color: Colors.date
    }
});

export default ActivityDetailScreen;
