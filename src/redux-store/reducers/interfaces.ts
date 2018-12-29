import {
    workerAvailability,
    daysAppointments,
    services,
    selectedServicesIds
} from './app-reducers';
import { calendarReferenceDate, calendarView } from './calendar-reducers';
import { user, autoAuthStatus } from './user-reducers';
import {
    newEventDate,
    newEventServiceId,
    newEventTab,
    newEvent,
    newEventWorkerType
} from './new-event-page-reducers';

export interface IStoreSignature {
    workerAvailability?: ReturnType<typeof workerAvailability>;
    calendarView?: ReturnType<typeof calendarView>;
    calendarReferenceDate?: ReturnType<typeof calendarReferenceDate>;
    daysAppointments?: ReturnType<typeof daysAppointments>;
    newEvent?: ReturnType<typeof newEvent>;
    newEventDate?: ReturnType<typeof newEventDate>;
    newEventServiceId?: ReturnType<typeof newEventServiceId>;
    newEventTab?: ReturnType<typeof newEventTab>;
    newEventWorkerType?: ReturnType<typeof newEventWorkerType>;
    services?: ReturnType<typeof services>;
    selectedServicesIds?: ReturnType<typeof selectedServicesIds>;
    user?: ReturnType<typeof user>;
    autoAuthStatus?: ReturnType<typeof autoAuthStatus>;
}
