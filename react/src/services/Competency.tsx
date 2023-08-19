import { API_URL } from '@env';
import axios from 'axios';

import { Pillar } from '../models/Subdomain';
import { StudentCompetency } from '../models/Student';
import * as SecureStore from 'expo-secure-store';
import TokenKey from '../constants/TokenKey';

interface getPillarParams {
    pillar_id?: string;
}

interface getStudentCardParams {
    student_id: string;
    subdomain_id?: string;
}

export const getPillar = async (pillarId?: string): Promise<Pillar[]> => {
    const url = `${API_URL}/subdomain`;
    const params: getPillarParams = {};
    if (pillarId) {
        params.pillar_id = pillarId;
    }
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${String(
                SecureStore.getItemAsync(TokenKey.userToken)
            )}`
        },
        params: params
    });
    const pillar = response.data.pillars;
    return pillar;
};

export const getStudentCard = async (
    studentId: string,
    subdomainId?: string
): Promise<StudentCompetency[]> => {
    const url = `${API_URL}/student/cards`;
    const params: getStudentCardParams = { student_id: studentId };
    if (subdomainId) {
        params.subdomain_id = subdomainId;
    }
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${String(
                SecureStore.getItemAsync(TokenKey.userToken)
            )}`
        },
        params: { student_id: studentId, subdomain_id: subdomainId }
    });
    const studentCard = response.data.cards;
    return studentCard;
};
