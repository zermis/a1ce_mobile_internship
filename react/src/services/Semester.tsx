import { API_URL } from '@env';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import TokenKey from '../constants/TokenKey';
import { UniversitySemester } from '../models/UniversitySemester';

interface getSemesterParams {
    university_code?: string;
}

export const getSemester = async (
    uniCode?: string
): Promise<UniversitySemester[]> => {
    const url = `${API_URL}/semester`;
    const params: getSemesterParams = {};
    if (uniCode) {
        params.university_code = uniCode;
    }

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${String(
                SecureStore.getItemAsync(TokenKey.userToken)
            )}`
        },
        params: { university_code: uniCode }
    });

    const universitySemester = response.data.semesters;

    return universitySemester;
};
