import {
    ACTIONS,
    ACTIONS_CREATORS,
    ACTIONS_STATUS
    // GetWorkersAvailabilityRequestParams
} from './interfaces';
import { NEW_EVENT_TABS } from 'Containers/NewEventPage/interfaces';
import { IActionCreator, IAsyncActionCreator } from './interfaces';
import {
    INewEventWorkerData,
    INewEventCustomerData,
    API_SERVICE_URLS,
    WorkerType
} from 'Common/interfaces';
import Axios from 'axios';
import { emitActionStatus } from 'Common/utils';
// import { getWorkersAvailability } from './app-actions';

const {
    NEW_EVENT_DATE,
    NEW_EVENT_SERVICE_ID,
    NEW_EVENT_TAB_CHANGE,
    NEW_EVENT_WORKER_DATA,
    NEW_EVENT_CUSTOMER_DATA,
    NEW_EVENT_RESET,
    NEW_EVENT_WORKER_TYPE_CHANGE
} = ACTIONS;

const { LOADING_STATUS, ERROR_STATUS, SUCCESS_STATUS } = ACTIONS_STATUS;
const { PostNewEvent } = ACTIONS_CREATORS;

export type ChangeWorkerType = IActionCreator<WorkerType>;
export const changeWorkerType: ChangeWorkerType = payload => {
    return { type: NEW_EVENT_WORKER_TYPE_CHANGE, payload };
};

export type PostNewEvent = IAsyncActionCreator<INewEventWorkerData>;
export const postNewEvent: PostNewEvent = newEvent => {
    emitActionStatus({ action: PostNewEvent, status: LOADING_STATUS });
    return async dispatch => {
        try {
            const { data } = await Axios.post(
                API_SERVICE_URLS.setAppointment,
                newEvent
            );

            // const { nextServiceId } = data;

            dispatch({
                type: NEW_EVENT_RESET
            });
            // dispatch({ type: NEW_EVENT_SERVICE_ID, payload: nextServiceId });
            // const workerType = 'cv';

            // const getWorkerParams: GetWorkersAvailabilityRequestParams = {
            //     service: nextServiceId,
            //     workerType
            // };

            // dispatch(changeWorkerType(workerType));
            // getWorkersAvailability(getWorkerParams)(dispatch);
            emitActionStatus({
                action: PostNewEvent,
                status: SUCCESS_STATUS,
                data
            });
        } catch (error) {
            emitActionStatus({
                data: error,
                action: PostNewEvent,
                status: ERROR_STATUS
            });
        }
    };
};

export type SetNewEventServiceId = IActionCreator<number | null>;
export const setNewEventServiceId: SetNewEventServiceId = serviceId => {
    return { type: NEW_EVENT_SERVICE_ID, payload: serviceId };
};

export type SetNewEventArtisanData = IActionCreator<INewEventWorkerData>;
export const setNewEventArtisanData: SetNewEventArtisanData = payload => {
    return {
        type: NEW_EVENT_WORKER_DATA,
        payload
    };
};

export type SetNewEventCustomerData = IActionCreator<INewEventCustomerData>;
export const setNewEventCustomerData: SetNewEventCustomerData = payload => {
    return {
        type: NEW_EVENT_CUSTOMER_DATA,
        payload
    };
};

export type SetNewEventTab = IActionCreator<NEW_EVENT_TABS>;
export const setNewEventTab: SetNewEventTab = payload => {
    return {
        type: NEW_EVENT_TAB_CHANGE,
        payload
    };
};

export type SetNewEventDate = IActionCreator<Date>;
export const setNewEventDate: SetNewEventDate = payload => {
    return {
        type: NEW_EVENT_DATE,
        payload
    };
};
