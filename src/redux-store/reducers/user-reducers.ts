import { ACTIONS } from 'Actions/interfaces';
import { IAction } from 'Actions/interfaces';
import { Reducer } from 'redux';

const { USER_AUTO_AUTH, USER_SAVE_ACTION } = ACTIONS;

export const user: Reducer<any, IAction> = (
    state = null,
    { type, payload }
) => {
    switch (type) {
        case USER_SAVE_ACTION:
            return payload;
        default:
            return state;
    }
};

/**
 *
 * @param state
 * @param params.payload
 * 0 => not yet initialized,
 * 0 to 1 transition => try to automatically authenticate user
 * -1 => auto auth already done
 */
export const autoAuthStatus: Reducer<-1 | 0 | 1, IAction> = (
    state = 0,
    { type, payload }
) => {
    switch (type) {
        case USER_AUTO_AUTH:
            return payload;

        default:
            return state;
    }
};
