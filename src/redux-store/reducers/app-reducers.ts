import { Reducer } from 'react';
import { IService, IDayWorkerAvailability } from 'Common/interfaces';
import { IAction, DeleteBookingParams } from 'Actions/interfaces';
import { ACTIONS } from 'Actions/interfaces';
import { IDayAppointment } from 'Common/interfaces';
import { dateAreSame } from 'Common/utils';
import moment from 'moment';
import { DATE_FORMAT } from 'Common/constants';

const {
    APPOINTMENTS_DELETE,
    APPOINTMENTS_NEW_ACTION,
    WORKERS_AVAILABILITY,
    SERVICE_LIST_ACTION,
    SERVICE_SELECT_ID_ACTION,
    SERVICE_UNSELECT_ID_ACTION,
    SERVICE_RESET_ACTION
} = ACTIONS;

export const workerAvailability: Reducer<IDayWorkerAvailability[], IAction> = (
    state = [],
    { payload, type }
) => {
    switch (type) {
        case WORKERS_AVAILABILITY:
            return payload;
        default:
            return state;
    }
};

export const services: Reducer<IService[], IAction> = (
    state = [],
    { type, payload }
) => {
    switch (type) {
        case SERVICE_LIST_ACTION:
            return payload;

        default:
            return state;
    }
};

const getUniqueIds = (arr: number[]) => Array.from(new Set([...arr]));

export const selectedServicesIds: Reducer<number[], IAction> = (
    state = [],
    { type, payload }
) => {
    switch (type) {
        case SERVICE_LIST_ACTION:
            return getUniqueIds([...payload.map((s: IService) => s.id)]);
        case SERVICE_SELECT_ID_ACTION: {
            return getUniqueIds([...state, payload]);
        }
        case SERVICE_UNSELECT_ID_ACTION: {
            return state.filter(id => id !== payload);
        }
        case SERVICE_RESET_ACTION: {
            return [];
        }
        default:
            return state;
    }
};

export const daysAppointments: Reducer<IDayAppointment[], IAction> = (
    state = [],
    { type, payload }
) => {
    switch (type) {
        case APPOINTMENTS_NEW_ACTION:
            return payload;
        case APPOINTMENTS_DELETE:
            {
                const { bookingId, date }: DeleteBookingParams = payload;
                const index = state.findIndex(ad =>
                    dateAreSame(moment(ad.date).toDate(), date, DATE_FORMAT)
                );
                if (index === -1) {
                    return state;
                }
                const [...newState] = state;
                const dayAppointments = newState[index];
                const appointments = dayAppointments.appointments.filter(
                    e => e.bookingId !== bookingId
                );
                if (appointments.length) {
                    newState[index] = {
                        date: dayAppointments.date,
                        appointments
                    };
                    return newState;
                } else {
                    newState.splice(index, 1);
                    return newState;
                }
            }
            return;
        default:
            return state;
    }
};
