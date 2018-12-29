import Axios, { AxiosResponse } from 'axios';
import {
    API_SERVICE_URLS,
    IDayWorkerAvailability,
    IService
} from 'Common/interfaces';
import { emitActionStatus } from 'Common/utils';
import {
    ACTIONS,
    ACTIONS_CREATORS,
    GetAppointmentsRequestParams,
    GetWorkersAvailabilityRequestParams,
    ACTIONS_STATUS,
    DeleteBookingParams
} from './interfaces';
import QS from 'querystring';
import { IAsyncActionCreator, IActionCreator } from './interfaces';

const { ERROR_STATUS, LOADING_STATUS, SUCCESS_STATUS } = ACTIONS_STATUS;

const {
    APPOINTMENTS_NEW_ACTION,
    APPOINTMENTS_DELETE,
    WORKERS_AVAILABILITY,
    NEW_EVENT_DATE,
    SERVICE_SELECT_ID_ACTION,
    SERVICE_UNSELECT_ID_ACTION,
    SERVICE_LIST_ACTION
} = ACTIONS;

const {
    DeleteBooking,
    GetAppointments,
    GetServiceList,
    GetWorkersAvailability
} = ACTIONS_CREATORS;

export type DeleteBooking = IAsyncActionCreator<DeleteBookingParams>;
export const deleteBooking: DeleteBooking = (params: DeleteBookingParams) => {
    return async dispatch => {
        const action = DeleteBooking;
        if (!params) {
            const error = new Error();
            error.message = 'null bookingId';
            emitActionStatus({ action, status: ERROR_STATUS, data: error });
        }
        emitActionStatus({ action, status: LOADING_STATUS });
        try {
            const { data } = await Axios.delete(
                API_SERVICE_URLS.deleteBookingById,
                { data: { bookingId: params.bookingId } }
            );
            emitActionStatus({ action, status: SUCCESS_STATUS, data });
            dispatch({ type: APPOINTMENTS_DELETE, payload: params });
        } catch (error) {
            emitActionStatus({ action, status: ERROR_STATUS, data: error });
        }
    };
};

export type GetAppointments = IAsyncActionCreator<GetAppointmentsRequestParams>;
export const getAppointments: GetAppointments = params => {
    const action = GetAppointments;
    return async dispatch => {
        const p: GetAppointmentsRequestParams = { storeId: 1 };
        const queryParams = QS.stringify(p);
        emitActionStatus({ action, status: LOADING_STATUS });
        try {
            const { data } = await Axios.get(
                `${API_SERVICE_URLS.bookings}?${queryParams}`
            );
            emitActionStatus({ action, status: SUCCESS_STATUS });
            dispatch({
                type: APPOINTMENTS_NEW_ACTION,
                payload: data.days
            });
        } catch (error) {
            emitActionStatus({ data: error, action, status: ERROR_STATUS });
        }
    };
};

export type GetWorkersAvailability = IAsyncActionCreator<
    GetWorkersAvailabilityRequestParams
>;
export const getWorkersAvailability: GetWorkersAvailability = (
    params: GetWorkersAvailabilityRequestParams
) => {
    const action = GetWorkersAvailability;
    emitActionStatus({ action, status: LOADING_STATUS });
    return async dispatch => {
        const p: GetWorkersAvailabilityRequestParams = params || {};
        p.beginDate = '';
        const queryParams = QS.stringify(p);
        try {
            const { data } = await Axios.get(
                `${API_SERVICE_URLS.workerAvailability}?${queryParams}`
            );
            const days: IDayWorkerAvailability[] = data.days;
            const firstAvailability = days.length ? days[0] : null;
            const newEventDate = firstAvailability
                ? new Date(firstAvailability.date)
                : null;
            dispatch({
                type: NEW_EVENT_DATE,
                payload: newEventDate
            });

            dispatch({
                type: WORKERS_AVAILABILITY,
                payload: days
            });
            emitActionStatus({ action, status: SUCCESS_STATUS });
            // console.log('getWorkersAvailability success');
        } catch (error) {
            emitActionStatus({ data: error, action, status: ERROR_STATUS });
        }
    };
};

export type GetServiceList = IAsyncActionCreator<any>;
export const getServiceList: GetServiceList = () => {
    return async dispatch => {
        const action = GetServiceList;
        emitActionStatus({ action, status: LOADING_STATUS });
        try {
            const resp: AxiosResponse<{
                services: IService[];
            }> = await Axios.get(API_SERVICE_URLS.serviceList);
            const { services } = resp.data;
            dispatch({
                type: SERVICE_LIST_ACTION,
                payload: services
            });
        } catch (error) {
            emitActionStatus({ data: error, action, status: ERROR_STATUS });
        }
    };
};

export type SetServiceSelectionState = IActionCreator<{
    id: number;
    checked: boolean;
}>;
export const setServiceSelectionState: SetServiceSelectionState = ({
    id,
    checked
}) => {
    return {
        type: checked ? SERVICE_SELECT_ID_ACTION : SERVICE_UNSELECT_ID_ACTION,
        payload: id
    };
};
