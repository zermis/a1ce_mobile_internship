import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState
} from 'react-navigation';

import { StudentSkill } from '../../models/Student';

interface Props {
    studentSkill: StudentSkill[];
    competencyTitle: string;
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SkillCard = (props: Props): JSX.Element => {
    return (
        <View>
            {props.studentSkill.map((skill: StudentSkill, key: number) => (
                <TouchableOpacity
                    style={styles.flexBetween}
                    key={key}
                    onPress={() =>
                        props.navigation.navigate({
                            routeName: 'SkillDetail',
                            params: {
                                competencyTitle: props.competencyTitle,
                                studentSkill: skill
                            }
                        })
                    }
                >
                    <Text style={styles.skillName} numberOfLines={1}>
                        {skill.title}
                    </Text>
                    <Entypo
                        name="chevron-right"
                        size={24}
                        color="#B52B37"
                        style={styles.icon}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    flexBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        alignItems: 'center',
        height: 60,
        marginVertical: 4,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    skillName: {
        color: '#B52B37',
        fontFamily: 'ibm-semibold',
        marginLeft: 15,
        maxWidth: 250
    },
    icon: {
        overflow: 'hidden',
        marginRight: 15
    }
});

export default SkillCard;
