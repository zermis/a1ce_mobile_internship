import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StorageRecordData {
    key: string;
    data: string | number | boolean | object | null | undefined;
}

export const ClearStorage = async (): Promise<void> =>
    await AsyncStorage.clear();

export const GetItem = async (key: string): Promise<any> => {
    try {
        const data = await AsyncStorage.getItem(key);
        if (isDataVaild(data)) {
            return JSON.parse(data as string);
        }
        return null;
    } catch (error) {
        console.log(error);
    }

    return null;
};

export const SaveItem = async (
    recordData: StorageRecordData
): Promise<void> => {
    const key = recordData.key;
    const data = JSON.stringify(recordData.data);

    try {
        if (isDataVaild(data)) {
            await AsyncStorage.setItem(key, data);
        } else {
            await AsyncStorage.setItem(key, '');
        }
    } catch (error) {
        console.log(
            `cannot save data into local storage [key: ${key} & data: ${String(
                data
            )}]`
        );
    }
};

export const SaveMultiItem = async (
    recordData: StorageRecordData[]
): Promise<void> => {
    const listData: [string, string][] = [];

    for (let i = 0; i < recordData.length; i++) {
        const key = recordData[i].key;
        const data = recordData[i].data;

        if (isDataVaild(data)) {
            listData.push([key, JSON.stringify(data)]);
        } else {
            listData.push([key, '']);
        }
    }

    try {
        await AsyncStorage.multiSet(listData);
    } catch (error) {
        for (let i = 0; i < recordData.length; i++) {
            void SaveItem(recordData[i]);
        }
    }
};

const isDataVaild = (
    data: string | number | boolean | object | null | undefined
): boolean => {
    if (data === null || data === undefined) {
        return false;
    }
    return true;
};
