import { EventEmitter } from 'events';
import { ACTIONS_STATUS_EVENT_EMITTER } from './constants';
import { ActionStatusEventEmitterCallback, ActionStatus } from './interfaces';
import { EventTime } from 'Components/KTSCalendar/interfaces';
import moment from 'moment';

const actionStatusEventEmitter = new EventEmitter();

export const subscribeToActionStatusEventEmitter = (
    actionCallback: ActionStatusEventEmitterCallback
) => {
    actionStatusEventEmitter.on(ACTIONS_STATUS_EVENT_EMITTER, actionCallback);
};

export const unsubscribeToActionStatusEventEmitter = (
    actionCallback: ActionStatusEventEmitterCallback
) => {
    actionStatusEventEmitter.removeListener(
        ACTIONS_STATUS_EVENT_EMITTER,
        actionCallback
    );
};

export const emitActionStatus = (actionStatus: ActionStatus) => {
    if (actionStatus.status === 'error') {
        console.log(`error occured in action ${actionStatus.action}`);
        console.error(actionStatus.data);
    }
    actionStatusEventEmitter.emit(ACTIONS_STATUS_EVENT_EMITTER, actionStatus);
};
/**
 * @param str 14:15:06 becomes {hh: 14, mm: 15, ss: 6}
 */
export const timeStringToHHMMSSObject = (str: string): EventTime => {
    const arr = str.split(':');
    const hh = parseInt(arr[0], 10);
    const mm = parseInt(arr[1], 10);
    const ss = arr.length > 2 ? parseInt(arr[2], 10) : undefined;

    const t: any = {
        hh,
        mm,
        ss
    };
    return t;
};

/**
 * @param eventTime {hh: 14, mm: 15, ss: 6} becomes 14:15:06
 */
export const hhmmssObjectToTimeString = ({ hh, mm, ss }: EventTime): string => {
    const toTimeString = (x: any) => {
        const l = ('' + x).length;
        return new Array(2 - l).fill('0') + x;
    };
    return `${toTimeString(hh)}:${toTimeString(mm)}`;
};

export const datesAreSame = (d1: Date, d2: Date, compareFormat: string) =>
    moment(d1).format(compareFormat) === moment(d2).format(compareFormat);

export const randomSwap = (array: any[]) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    const [...newArray] = array;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = newArray[currentIndex];
        newArray[currentIndex] = newArray[randomIndex];
        newArray[randomIndex] = temporaryValue;
    }

    return newArray;
};
