// for example if the app has some users data and actions associated to it,
// you must create a separated file called user(s)-actions.ts to write all related actions in it.

import {
    ACTIONS,
    ACTIONS_CREATORS,
    ACTIONS_STATUS,
    IActionCreator
} from './interfaces';
import { IAsyncActionCreator } from './interfaces';
import Axios from 'axios';
import { emitActionStatus } from 'Common/utils';
import { API_SERVICE_URLS } from 'Common/interfaces';

const { USER_AUTO_AUTH, USER_SAVE_ACTION } = ACTIONS;
const { GetUserAuth } = ACTIONS_CREATORS;
const { ERROR_STATUS, LOADING_STATUS, SUCCESS_STATUS } = ACTIONS_STATUS;

export const userAuth: IAsyncActionCreator<string> = token => {
    emitActionStatus({
        action: GetUserAuth,
        status: LOADING_STATUS
    });
    return async dispatch => {
        const auth = `Bearer ${token}`;
        try {
            const res = await Axios.get(API_SERVICE_URLS.AUTH, {
                headers: { Authorization: auth }
            });

            if (res.status === 200) {
                Axios.defaults.headers = { Authorization: auth };
                const { data } = res;
                dispatch({
                    type: USER_SAVE_ACTION,
                    payload: { ...data, email: data.id }
                });
                emitActionStatus({
                    action: GetUserAuth,
                    status: SUCCESS_STATUS
                });
            } else {
                const error = new Error();
                error.message = res.status + ' ' + res.statusText;
                emitActionStatus({
                    data: error,
                    action: GetUserAuth,
                    status: ERROR_STATUS
                });
            }
        } catch (error) {
            emitActionStatus({
                data: error,
                action: GetUserAuth,
                status: ERROR_STATUS
            });
        }
    };
};

export type SetUserAutoAuthStatus = IActionCreator<-1 | 0 | 1>;
export const setUserAutoAuthStatus: SetUserAutoAuthStatus = payload => {
    return { payload, type: USER_AUTO_AUTH };
};
