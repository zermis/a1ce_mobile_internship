import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';
import { StudentCompetency } from '../../models/Student';

import Card from '../competency/Card';
import ViewMoreButton from '../shared/ViewMoreButton';
import Ribbon from './Ribbon';

interface Props {
    studentCard: StudentCompetency[] | any;
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const CompentencyContent = (props: Props): JSX.Element => {
    return (
        <View>
            <Ribbon text="In Progress Cards" />
            <FlatList
                data={props.studentCard.slice(0, 10)}
                showsHorizontalScrollIndicator={false}
                maxToRenderPerBatch={10}
                horizontal={true}
                keyExtractor={(card: StudentCompetency) => card.id}
                overScrollMode="never"
                renderItem={({ item }) => (
                    <Card
                        style={styles.competencyCard}
                        studentCard={item}
                        navigation={props.navigation}
                    />
                )}
                ListFooterComponent={() => (
                    <ViewMoreButton
                        onNavigate={props.navigation}
                        length={props.studentCard.length}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    competencyCard: {
        margin: 0,
        marginRight: 4
    },
    competencyStatus: {
        flexDirection: 'row',
        marginBottom: 10
    }
});

export default CompentencyContent;
