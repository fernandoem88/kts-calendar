import { Reducer } from 'redux';
import { IAction } from 'Actions/interfaces';
import { ACTIONS } from 'Actions/interfaces';
import { NEW_EVENT_TABS } from 'Containers/NewEventPage/interfaces';
import { INewEventWorkerData, WorkerType } from 'Common/interfaces';

const {
    NEW_EVENT_DATE,
    NEW_EVENT_SERVICE_ID,
    NEW_EVENT_TAB_CHANGE,
    NEW_EVENT_WORKER_DATA,
    NEW_EVENT_CUSTOMER_DATA,
    NEW_EVENT_RESET,
    NEW_EVENT_WORKER_TYPE_CHANGE
} = ACTIONS;

/**
 * @description l'id del servizio associato all evento "new event"
 */

export const newEventServiceId: Reducer<number | null, IAction> = (
    state = null,
    { type, payload }
) => {
    switch (type) {
        case NEW_EVENT_SERVICE_ID:
            return payload;

        default:
            return state;
    }
};

export const newEventTab: Reducer<NEW_EVENT_TABS, IAction> = (
    state = NEW_EVENT_TABS.SOPRA_LUOGO,
    { type, payload }
) => {
    switch (type) {
        case NEW_EVENT_TAB_CHANGE:
            return payload;
        default:
            return state;
    }
};

export const newEventWorkerType: Reducer<WorkerType, IAction> = (
    state = 'artigiano',
    { type, payload }
) => {
    switch (type) {
        case NEW_EVENT_WORKER_TYPE_CHANGE:
            return payload;
        default:
            return state;
    }
};

export const newEventDate: Reducer<Date | null, IAction> = (
    state = null,
    { type, payload }
) => {
    switch (type) {
        case NEW_EVENT_DATE:
            return payload;
        case NEW_EVENT_RESET:
            return null;
        default:
            return state;
    }
};

export const newEvent: Reducer<INewEventWorkerData | null, IAction> = (
    state = null,
    { type, payload }
) => {
    switch (type) {
        case NEW_EVENT_WORKER_DATA:
            return payload;
        case NEW_EVENT_CUSTOMER_DATA:
            const newState = state || {};
            return { ...newState, customer: payload };
        case NEW_EVENT_RESET:
            return null;
        default:
            return state;
    }
};
