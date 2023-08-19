import { API_URL } from '@env';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import TokenKey from '../constants/TokenKey';
import { Roadmap } from '../models/Roadmap';

interface getRoadmapParams {
    year: string;
    semester: string;
    student_id?: string;
}

export const getRoadmap = async (
    year: string,
    semester: string,
    studentId?: string
): Promise<Roadmap[]> => {
    const url = `${API_URL}/roadmap/milestones`;
    const params: getRoadmapParams = { year, semester };
    if (studentId) {
        params.student_id = studentId;
    }

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${String(
                SecureStore.getItemAsync(TokenKey.userToken)
            )}`
        },
        params: { year, semester, student_id: studentId }
    });

    const roadmap = response.data.roadmaps;
    return roadmap;
};
