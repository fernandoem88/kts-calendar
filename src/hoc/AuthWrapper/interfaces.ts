import { ReactStandarProps } from 'Common/interfaces';

import { GetAppointments, GetServiceList } from 'Actions/app-actions';
import { SetNewEventServiceId } from 'Actions/new-event-page-actions';

export type IAuthWrapperProps = ReactStandarProps & {
    userAuth: (token: string) => any;
    user: string;
    getAppointments: GetAppointments;
    setNewEventServiceId: SetNewEventServiceId;
    getServiceList: GetServiceList;
};
