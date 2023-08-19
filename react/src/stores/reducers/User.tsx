import { AnyAction } from 'redux';

import CONNECTION_STATUS from '../../constants/ConnectionStatus';
import { CHANGE_CONNECTION_MODE } from '../constants/User';

interface StateType {
    connectionMode: string;
}

const initialState: StateType = {
    connectionMode: CONNECTION_STATUS.ONLINE
};

const UserReducer = (state = initialState, action: AnyAction): StateType => {
    switch (action.type) {
        case CHANGE_CONNECTION_MODE:
            return {
                ...state,
                connectionMode: action.payload
            };
        default:
            return state;
    }
};

export default UserReducer;
