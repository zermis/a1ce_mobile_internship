import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import { RelatedCompetency } from '../../models/Calendar';

interface Props {
    relatedCompetencies: RelatedCompetency[];
    style?: object;
}

const DetailUnorderedListText = (props: Props) => {
    return (
        <View>
            {props.relatedCompetencies.map(
                (competency: RelatedCompetency, index: number) => (
                    <View style={styles.unorderedListContainer} key={index}>
                        <Text style={styles.unorderedListDot}>{'\u2022'}</Text>
                        <Text style={styles.unorderedListText}>
                            {competency.title}
                        </Text>
                    </View>
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    unorderedListContainer: {
        flexDirection: 'row'
    },
    unorderedListDot: {
        color: Colors.textBody
    },
    unorderedListText: {
        paddingLeft: 5,
        color: Colors.textBody,
        fontFamily: 'ibm-regular',
        fontSize: 14
    }
});

export default DetailUnorderedListText;
