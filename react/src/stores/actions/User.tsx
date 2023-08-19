import { Store, AppDispatch } from '../Store';
import { CHANGE_CONNECTION_MODE } from '../constants/User';
import CONNECTION_STATUS from '../../constants/ConnectionStatus';

const toggleConnectionMode = (): string => {
    return Store.getState().user.connectionMode === CONNECTION_STATUS.ONLINE
        ? CONNECTION_STATUS.OFFLINE
        : CONNECTION_STATUS.ONLINE;
};

export const ChangeConnectionModeAction = (connectionMode?: string): any => {
    return (dispatch: AppDispatch) => {
        const result = connectionMode ? connectionMode : toggleConnectionMode();
        dispatch({
            type: CHANGE_CONNECTION_MODE,
            payload: result
        });
    };
};
