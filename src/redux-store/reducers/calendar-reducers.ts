import { TViewType } from 'Components/CalendarToolbar/interfaces';
import { IAction } from 'Actions/interfaces';
import { ACTIONS } from 'Actions/interfaces';
import { Reducer } from 'react';

const {
    CHANGE_CALENDAR_VIEW_ACTION,
    CHANGE_CALENDAR_REFERENCE_DATE_ACTION
} = ACTIONS;

export const calendarView: Reducer<TViewType, IAction> = (
    state = 'month',
    { type, payload }
) => {
    switch (type) {
        case CHANGE_CALENDAR_VIEW_ACTION:
            return payload;
        default:
            return state;
    }
};

export const calendarReferenceDate: Reducer<Date | null, IAction> = (
    state = null,
    { type, payload }
) => {
    switch (type) {
        case CHANGE_CALENDAR_REFERENCE_DATE_ACTION:
            return payload;
        default:
            return state;
    }
};
