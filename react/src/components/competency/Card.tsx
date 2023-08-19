import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';
import Animated from 'react-native-reanimated';

import Colors from '../../constants/Colors';
import { compareCompetencyStatus } from '../../utils/SelectedColorStatus';
import { StudentCompetency, StudentSkill } from '../../models/Student';

interface Props {
    style?: object;
    studentCard: StudentCompetency;
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const width = Dimensions.get('window').width;

const Card = (props: Props) => {
    const subdomainTitle: string = props.navigation?.getParam('subdomainTitle');

    const allSkill: number = props.studentCard.skills?.length;
    const completedSkill: number = props.studentCard.skills?.filter(
        (skill: StudentSkill) => skill.assessment.result > 0
    ).length;

    return (
        <TouchableOpacity
            onPress={() => {
                props.navigation.navigate({
                    routeName: 'CompetencyDetail',
                    params: {
                        subdomainTitle: subdomainTitle,
                        studentCard: props.studentCard
                    }
                });
            }}
        >
            <View style={[styles.card, props.style]}>
                <View style={styles.firstRow}>
                    <Image
                        style={styles.competencyImage}
                        source={require('../../assets/images/chemistryIcon.png')}
                    ></Image>
                    <View
                        style={{
                            ...styles.ribbon,
                            backgroundColor: compareCompetencyStatus(
                                props.studentCard.status_val
                            )
                        }}
                    >
                        <Text style={styles.cardStatusText}>
                            {props.studentCard.status || 'unknown'}
                        </Text>
                    </View>
                </View>
                <View style={styles.middleRow}>
                    <Text numberOfLines={2} style={styles.title}>
                        {props.studentCard.title || 'Unknown Title'}
                    </Text>
                </View>
                <View style={styles.bottomRow}>
                    <Text style={styles.skillAmount}>
                        Completed {completedSkill}/{allSkill} Skills
                    </Text>
                    <View style={styles.progressBar}>
                        <Animated.View
                            style={{
                                ...styles.progressBarInside,
                                width: `${100 * (completedSkill / allSkill)}%`
                            }}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 4,
        flex: 0.5,
        borderRadius: 15,
        height: 190,
        width: width / 2.3,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Colors.borderColor
    },
    itemInvisible: {
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    firstRow: {
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'space-between',
        padding: 10,
        height: '40%'
    },
    ribbon: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '35%',
        borderRadius: 5
    },
    competencyImage: {
        width: 60,
        height: 60
    },
    middleRow: {
        height: '35%'
    },
    title: {
        fontSize: 16,
        fontFamily: 'ibm-medium',
        padding: 10
    },
    bottomRow: {
        height: '25%'
    },
    skillAmount: {
        fontSize: 12,
        fontFamily: 'ibm-regular',
        padding: 10,
        color: '#4E4C4D'
    },
    progressBar: {
        height: 5,
        flexDirection: 'row',
        width: '90%',
        backgroundColor: 'lightgray',
        marginHorizontal: 9,
        borderRadius: 5
    },
    progressBarInside: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#9ED890',
        borderRadius: 5
    },
    cardStatusText: {
        color: '#FFF',
        fontSize: 11
    }
});

export default Card;
