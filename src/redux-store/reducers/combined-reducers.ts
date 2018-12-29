import { combineReducers } from 'redux';
import { calendarView, calendarReferenceDate } from './calendar-reducers';
import { user, autoAuthStatus } from './user-reducers';
import {
    workerAvailability,
    services,
    selectedServicesIds,
    daysAppointments
} from './app-reducers';
import {
    newEvent,
    newEventDate,
    newEventServiceId,
    newEventTab,
    newEventWorkerType
} from './new-event-page-reducers';

export const combinedReducers = combineReducers({
    workerAvailability,
    calendarView,
    calendarReferenceDate,
    daysAppointments,
    newEvent,
    newEventDate,
    newEventServiceId,
    newEventTab,
    newEventWorkerType,
    services,
    selectedServicesIds,
    user,
    autoAuthStatus
});
