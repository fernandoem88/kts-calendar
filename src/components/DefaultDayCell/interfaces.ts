import { CalendarEvent, ViewType } from 'Components/KTSCalendar/interfaces';

export interface DayCellProps<
    E extends CalendarEvent = CalendarEvent,
    V extends ViewType = ViewType
> {
    dayIndex: number;
    calendarReferenceDate: Date;
    cellDate: Date;
    dayEvents: E[];
    isInSelectedMonth: boolean;
    isTodayDate: boolean;
    view: V;
    weekIndex: number;
    weeks: number;
    navigation?: {
        onView?: (view: V) => any;
        onDate?: (refDate: Date) => any;
    };
    onDayEventClick?: (mouseEvent: React.MouseEvent, dayEvent: E) => any;
}
/**
 * @constant DAY_CELL the element is a day cell
 * @constant IN_FIRST_WEEK the element is in the first week of the month
 * @constant IN_LAST_WEEK the element is in the last week of the month
 * @constant WEEK_FIRST_DAY the element is starting day (monday or sunday) in the week
 * @constant WEEK_LAST_DAY the element is last day (sunday or saturday) in the week
 * @constant IN_SELECTED_MONTH the element is the month of the reference date in the calendar
 * @constant TODAY_CELL the element date is same as today
 * @constant CALENDAR_REFERENCE_DAY the element date is same as the calendar reference date
 */
export enum defaultDayCellClasses {
    DAY_CELL = 'day-cell',
    IN_FIRST_WEEK = 'in-first-week',
    IN_LAST_WEEK = 'in-last-week',
    WEEK_FIRST_DAY = 'week-first-day',
    WEEK_LAST_DAY = 'week-last-day',
    IN_SELECTED_MONTH = 'in-selected-month',
    TODAY_CELL = 'today-cell',
    CALENDAR_REFERENCE_DAY = 'same-as-calendar-reference-date'
}
