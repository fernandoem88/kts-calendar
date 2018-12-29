import { ACTIONS } from './interfaces';
import { IActionCreator } from './interfaces';
import { TViewType } from 'Components/CalendarToolbar/interfaces';

const {
    CHANGE_CALENDAR_VIEW_ACTION,
    CHANGE_CALENDAR_REFERENCE_DATE_ACTION
} = ACTIONS;

export type ChangeCalendarView = IActionCreator<TViewType>;
export const changeCalendarView: ChangeCalendarView = payload => {
    return { type: CHANGE_CALENDAR_VIEW_ACTION, payload };
};

export type ChangeCalendarReferenceDate = IActionCreator<Date>;
export const changeCalendarReferenceDate: ChangeCalendarReferenceDate = payload => {
    return { type: CHANGE_CALENDAR_REFERENCE_DATE_ACTION, payload };
};
