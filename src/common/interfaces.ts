import { ACTIONS_CREATORS, ACTIONS_STATUS } from 'Actions/interfaces';

export type ReactStandarProps = React.ClassAttributes<any> &
    React.HTMLAttributes<any>;

export interface ActionStatus {
    action: ACTIONS_CREATORS;
    status: ACTIONS_STATUS;
    data?: any;
}

export type ActionStatusEventEmitterCallback = (
    actionStatus: ActionStatus
) => any;
