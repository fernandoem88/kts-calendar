import { WorkerType } from 'Common/interfaces';

/**
 * @description evrey action to dispatch must have this signature
 */
export interface IAction {
    type: ACTIONS;
    payload?: any;
}
/**
 * @description create and dispatch action to reducers.
 * @param params the params to use to implement logic and create the action.
 */
export type IActionCreator<P> = (param: P) => IAction;

/**
 * @description the AsyncActionCreator returns a function of type AsyncActionCreatorReturnType which has dispatch as parameter.
 * @param params the params to use to implement logic and create the action.
 * the action creator ends in error and does not dispatch the error in the store.
 * in this case, the error case can be catched directly by the component directly.
 * NB: the callback parameter is an observable in order to allow the component to unsubscribe in componentWillUnmount fase.
 */
export type IAsyncActionCreator<P> = (
    params?: P
) => IAsyncActionCreatorReturnType;
/**
 * @description the return type of an AsyncActionCreator function.
 * @param dispatch the dispatcher function.
 */
export type IAsyncActionCreatorReturnType = (
    dispatch: DispatcherFunction
) => any;
/**
 * @description the dispatcher function will be used to dispatch an action to the store
 * @param action the action to dispatch
 */
export type DispatcherFunction = (action: IAction) => void;

// ====================
// tslint:disable:interface-over-type-literal
// declare actions types here
export enum ACTIONS_STATUS {
    LOADING_STATUS = 'loading',
    SUCCESS_STATUS = 'success',
    ERROR_STATUS = 'error'
}
export enum ACTIONS {
    APPOINTMENTS_DELETE = 'APPOINTMENTS_DELETE',
    APPOINTMENTS_NEW_ACTION = 'NEW_APPOINTMENTS_ACTION',
    WORKERS_AVAILABILITY = 'WORKERS_AVAILABILITY',
    CHANGE_CALENDAR_VIEW_ACTION = 'CHANGE_CALENDAR_VIEW_ACTION',
    CHANGE_CALENDAR_REFERENCE_DATE_ACTION = 'CHANGE_CALENDAR_REFERENCE_DATE_ACTION',
    // new event page component actions
    NEW_EVENT_CUSTOMER_DATA = 'NEW_EVENT_CUSTOMER_DATA',
    NEW_EVENT_DATE = 'NEW_EVENT_DATE',
    NEW_EVENT_RESET = 'NEW_EVENT_RESET',
    NEW_EVENT_SERVICE_ID = 'NEW_EVENT_SERVICE_ID',
    NEW_EVENT_TAB_CHANGE = 'NEW_EVENT_TAB_CHANGE',
    NEW_EVENT_WORKER_DATA = 'NEW_EVENT_WORKER_DATA',
    NEW_EVENT_WORKER_TYPE_CHANGE = 'NEW_EVENT_WORKER_TYPE_CHANGE',
    // App service
    SERVICE_LIST_ACTION = 'SERVICE_LIST_ACTION',
    SERVICE_SELECT_ID_ACTION = 'SERVICE_SELECT_ID_ACTION',
    SERVICE_SET_SELECTED_IDS = 'SERVICE_SET_SELECTED_IDS',
    SERVICE_UNSELECT_ID_ACTION = 'SERVICE_UNSELECT_ID_ACTION',
    SERVICE_RESET_ACTION = 'SERVICE_RESET_ACTION',

    USER_AUTO_AUTH = 'USER_AUTO_AUTH',
    USER_SAVE_ACTION = 'USER_SAVE_ACTION',

    __IGNORE_ACTION__ = '__IGNORE_ACTION__'
}

export enum ACTIONS_CREATORS {
    ChangeCalendarReferenceDate = 'ChangeCalendarReferenceDate',
    ChangeCalendarView = 'ChangeCalendarView',
    ChangeWorkerType = 'ChangeWorkerType',
    // async get
    DeleteBooking = 'DeleteBooking',
    GetAppointments = 'GetAppointments',
    GetWorkersAvailability = 'GetWorkersAvailability',
    GetServiceList = 'GetServiceList',
    GetUserAuth = 'UserAuth',
    // async post
    PostNewEvent = 'PostNewEvent',
    SetNewEventServiceId = 'SetNewEventServiceId',
    SetServiceSelectionState = 'SetServiceSelectionState',
    SetNewEvent = 'SetNewEvent'
}

export type DeleteBookingParams = {
    bookingId: number;
    date: Date;
};
export type GetAppointmentsRequestParams = {
    storeId: string | number;
};

export type GetWorkersAvailabilityRequestParams = {
    service: number;
    beginDate?: string;
    workerType: WorkerType;
};
