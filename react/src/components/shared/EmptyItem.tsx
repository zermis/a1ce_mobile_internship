import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
    header?: string;
}

const EmptyItem = (props: Props): JSX.Element => {
    return (
        <View style={styles.container}>
            {props.header && (
                <Text style={styles.headerText}>{props.header}</Text>
            )}
            <Image
                style={styles.image}
                source={require('../../assets/images/panda.png')}
            ></Image>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        overflow: 'hidden',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 18,
        fontFamily: 'ibm-regular'
    },
    image: {
        height: 220,
        width: 250,
        alignSelf: 'center'
    }
});

export default EmptyItem;
