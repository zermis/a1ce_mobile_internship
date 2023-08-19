import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

interface Props {
    userName: string;
    userEmail: string;
    userStudentID: string;
    userProfile: string;
}

const CustomSidebarUserInfo = (props: Props) => {
    const image = (
        <Image
            style={styles.userPicture}
            source={
                props.userProfile
                    ? { uri: props.userProfile }
                    : require('../../assets/images/profile.png')
            }
        />
    );
    const userName = props.userName ? (
        <Text style={styles.userName}>{props.userName}</Text>
    ) : null;
    const userEmail = props.userEmail ? (
        <Text style={styles.userEmail}>{props.userEmail}</Text>
    ) : null;
    const userStudentID = props.userStudentID ? (
        <Text style={styles.userStudentID}>{props.userStudentID}</Text>
    ) : null;

    return (
        <View style={styles.userInfo}>
            {image}
            {userName}
            {userStudentID}
            {userEmail}
        </View>
    );
};

const styles = StyleSheet.create({
    userInfo: {
        justifyContent: 'center',
        marginVertical: 38,
        alignItems: 'center'
    },
    userPicture: {
        height: 80,
        width: 80,
        borderRadius: 80 / 2,
        backgroundColor: '#222'
    },
    userName: {
        fontSize: 25,
        fontFamily: 'ibm-bold',
        color: Colors.nameColor,
        marginTop: 9,
        marginBottom: 2.5,
        textAlign: 'center'
    },
    userStudentID: {
        fontSize: 17,
        fontFamily: 'ibm-regular',
        color: Colors.userInfoColor,
        marginLeft: '1%',
        marginBottom: 2.5
    },
    userEmail: {
        fontSize: 17,
        fontFamily: 'ibm-regular',
        color: Colors.userInfoColor,
        marginLeft: '1%',
        marginBottom: -8
    }
});

export default CustomSidebarUserInfo;
