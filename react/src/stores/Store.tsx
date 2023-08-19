import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import userReducer from './reducers/User';

const RootReducer = combineReducers({
    user: userReducer
});

export const Store = createStore(RootReducer, applyMiddleware(ReduxThunk));
export type RootState = ReturnType<typeof RootReducer>;
export type AppDispatch = typeof Store.dispatch;
