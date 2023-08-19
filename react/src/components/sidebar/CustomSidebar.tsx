import React, { useState } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, ScrollView, StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { DrawerNavigatorItemsProps } from 'react-navigation-drawer/lib/typescript/src/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import Colors from '../../constants/Colors';
import TokenKey from '../../constants/TokenKey';
import CustomSidebarButton from './CustomSidebarButton';
import CustomSidebarUserInfo from './CustomSidebarUserInfo';
import { _signOutAsync } from '../../utils/GoogleOAuth';
import { ClearStorage } from '../../utils/LocalAsyncStorage';

const CustomSidebar = (
    props: DrawerNavigatorItemsProps | Readonly<DrawerNavigatorItemsProps> | any
): JSX.Element => {
    const [userInfo, setUserInfo] = useState<any>({
        isFetch: false,
        userName: '',
        userEmail: '',
        userStudentID: '',
        userPhotoUrl: '',
        signInConfig: {},
        accessToken: ''
    });

    if (!userInfo.isFetch) {
        void SecureStore.getItemAsync(TokenKey.userToken).then((res) => {
            if (res) {
                // The reason that we use the appoarch below instead of setUserInfo({ isFetch: true, ...JSON.parse(res) }) is becuase
                // This will immediately update our state in right order, and guarantee our state will be updated first
                setUserInfo((prevUserInfo: any) => {
                    return {
                        ...prevUserInfo,
                        ...{ isFetch: true, ...JSON.parse(res) }
                    };
                });
            }
        });
    }
    return (
        <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}
        >
            <View style={styles.accountView}>
                <CustomSidebarUserInfo
                    userName={userInfo.userName}
                    userEmail={userInfo.userEmail}
                    userStudentID={userInfo.userStudentID}
                    userProfile={userInfo.userPhotoUrl}
                />
            </View>
            <View style={{ marginTop: 0, ...styles.bar }}></View>
            <ScrollView
                overScrollMode="never"
                showsVerticalScrollIndicator={false}
            >
                <DrawerItems {...props} />
            </ScrollView>
            <View style={styles.bar}></View>
            <View style={styles.bottomView}>
                <CustomSidebarButton
                    onPress={() => {
                        void _signOutAsync(
                            userInfo.accessToken,
                            userInfo.signInConfig,
                            TokenKey.userToken
                        );
                        void ClearStorage();
                        props.navigation.navigate('Auth');
                    }}
                    title="Logout"
                    icon={
                        <MaterialCommunityIcons
                            name="logout-variant"
                            size={23}
                            color={Colors.logoutIconColor}
                        />
                    }
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bar: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.userInfoColor
    },
    accountView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomView: {
        bottom: 0,
        width: '100%',
        paddingVertical: 2.5
    }
});

export default CustomSidebar;
