import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import Header from '../components/shared/Header';
import Body from '../components/shared/Body';

interface Props {
    isMain: boolean;
    headerContent?: JSX.Element;
    bodyContent?: JSX.Element;
    headerStyles?: object;
    bodyStyle?: object;
    accessibilityLabel?: string;
}

const { height, width } = Dimensions.get('window');

const PageContainer = (props: Props) => {
    const headerStyle = props.isMain
        ? { marginTop: height * 0.05, overflow: 'hidden' }
        : Platform.OS === 'ios'
        ? { marginTop: height * 0.08, overflow: 'hidden' }
        : { marginTop: height * 0.09, overflow: 'hidden' };

    const bodyStyle = props.isMain
        ? {
              zIndex: 1,
              paddingHorizontal: width * 0.05,
              overflow: 'hidden'
          }
        : {
              zIndex: -1,
              paddingTop: 75,
              paddingHorizontal: width * 0.05,
              overflow: 'hidden'
          };

    return (
        <View style={styles.container}>
            <Header style={{ ...props.headerStyles, ...headerStyle }}>
                {props.headerContent}
            </Header>
            <Body
                style={{ ...props.bodyStyle, ...bodyStyle }}
                accessibilityLabel={props.accessibilityLabel}
            >
                {props.bodyContent}
            </Body>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default PageContainer;
