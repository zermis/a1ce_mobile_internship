import * as Google from 'expo-google-app-auth';
import * as SecureStore from 'expo-secure-store';

import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '@env';
import { SIGNIN_STATUS } from '../constants/AuthenticationStatus';
import TokenKey from '../constants/TokenKey';

const config = {
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    scopes: ['profile', 'email']
};

export const _signInAsync = async (): Promise<string> => {
    const result: any = await Google.logInAsync(config);

    if (result.type == SIGNIN_STATUS.SUCCESS) {
        const { email, name, photoUrl } = result.user;

        await SecureStore.setItemAsync(
            TokenKey.userToken,
            JSON.stringify({
                userEmail: email,
                userName: name,
                userPhotoUrl: photoUrl,
                signInConfig: config,
                accessToken: result.accessToken
            })
        );

        return SIGNIN_STATUS.SUCCESS;
    }

    return SIGNIN_STATUS.CANCEL;
};

export const _signOutAsync = async (
    accessToken: string,
    signInConfig: any,
    token: string
): Promise<void> => {
    if (accessToken && signInConfig) {
        await Google.logOutAsync({ accessToken, ...signInConfig });
    }

    await SecureStore.deleteItemAsync(token);
};
