import { API_URL } from '@env';
import axios from 'axios';
import TokenKey from '../constants/TokenKey';
import * as SecureStore from 'expo-secure-store';
import { CalendarEvent } from '../models/Calendar';

export const getCalendarEvent = async (
    startDate: string,
    endDate: string
): Promise<CalendarEvent[]> => {
    const url = `${API_URL}/calendar/events`;
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${String(
                SecureStore.getItemAsync(TokenKey.userToken)
            )}`
        },
        params: { start_date: startDate, end_date: endDate }
    });
    const event = response.data.events;
    return event;
};
