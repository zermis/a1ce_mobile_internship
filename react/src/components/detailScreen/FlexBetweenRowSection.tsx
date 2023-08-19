import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { detailPageStyle } from '../../shared/Styles';

interface Props {
    header?: string;
    body?: JSX.Element;
    style?: object;
}

const FlexBetweenRowSection = (props: Props): JSX.Element => {
    return (
        <View style={styles.flexBetweenContainer}>
            <Text style={{ ...detailPageStyle.textHeader, ...props.style }}>
                {props.header}
            </Text>
            {props.body}
        </View>
    );
};

const styles = StyleSheet.create({
    flexBetweenContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 9
    }
});

export default FlexBetweenRowSection;
