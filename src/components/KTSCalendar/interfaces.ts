// import { DayCellProps } from 'Components/DefaultDayCell/interfaces';
// import { ReactStandarProps } from 'Common/interfaces';

export type DayName =
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday';

export type DaysArray = [
    string,
    string,
    string,
    string,
    string,
    string,
    string
];
export type MonthsArray = [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
];
export type Range7 = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Range12 = Range7 | 7 | 8 | 9 | 10 | 11;
export type Range24 =
    | Range12
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23;
export type Range31 = Exclude<Range24, 0> | 25 | 26 | 27 | 28 | 29 | 30 | 31;
export type Range60 =
    | 0
    | Range31
    | 32
    | 33
    | 34
    | 35
    | 36
    | 37
    | 38
    | 39
    | 40
    | 41
    | 42
    | 43
    | 44
    | 45
    | 46
    | 47
    | 48
    | 49
    | 50
    | 51
    | 52
    | 53
    | 54
    | 55
    | 56
    | 57
    | 58
    | 59;

/**
 * @property date the event date. this will be truncated only on day/month/year info
 */
export interface CalendarEvent {
    date: Date;
    startTime: EventTime;
    endTime: EventTime;
    title: any;
    id: string | number;
    eventCategoryId?: string;
}

export interface DayCellProps<
    E extends CalendarEvent = CalendarEvent,
    V = ViewType
> extends EventsWrapperRendererParams<E, V> {
    renderEvent: EventRenderer<E, V>;
    renderEventWrapper?: EventsWrapperRenderer<E, V>;
}

export interface EventCategory {
    id: string;
    color: string;
}

export interface EventDate {
    DD: number & Range31;
    MM: Exclude<Range12, 0> | 12;
    YYYY: number;
}
export interface EventTime {
    hh: Range24;
    mm: Range60;
    ss?: Range60;
}

export interface EventNavigation<V = ViewType> {
    onDate?: (newReferenceDate: Date) => any;
    onView?: (newView: V) => any;
}

export type EventRenderer<
    E extends CalendarEvent = CalendarEvent,
    V = ViewType
> = (data: EventRendererParams<E, V>) => JSX.Element | string | null;

export interface EventRendererParams<
    E extends CalendarEvent = CalendarEvent,
    V = ViewType
> {
    calendarReferenceDate: Date;
    cellEvents: E[];
    event: E;
    navigation?: EventNavigation<V>;
    view: V;
}
export type EventsWrapperRenderer<
    E extends CalendarEvent = CalendarEvent,
    V = ViewType
> = (
    params: EventsWrapperRendererParams<E, V>
) => React.FunctionComponent | React.ComponentClass;
export interface EventsWrapperRendererParams<
    E extends CalendarEvent = CalendarEvent,
    V = ViewType
> {
    columnIndex: number;
    calendarReferenceDate: Date;
    cellDate: Date;
    cellEvents: E[];
    isInSelectedMonth: boolean;
    isTodayDate: boolean;
    rowIndex: number;
    view: V;
    weeks: number;
    navigation?: {
        onView?: (view: V) => any;
        onDate?: (refDate: Date) => any;
    };
    onDayEventClick?: (mouseEvent: React.MouseEvent, dayEvent: E) => any;
}
export interface KTSCalendarProps<
    E extends CalendarEvent = CalendarEvent,
    V = ViewType
> {
    events: E[];
    date: Date;
    view: V;
    // views?: keyof (V);
    daysNames?: DaysArray;
    dayHoursRangeStart?: number;
    dayHoursRangeEnd?: number;
    monthsNames?: MonthsArray;
    weekStartAt?: 'monday' | 'sunday';
    components?: {
        /**
         * @description the render of a single event. use it if you want the wrapper to be the default one
         */
        renderEvent?: EventRenderer;
        renderEventsWrapper?: EventsWrapperRenderer;
        renderGridHeader?: (
            calendarProps: KTSCalendarProps
        ) => JSX.Element | string | null;
        renderGridHoursLateralRange?: (
            calendarProps: KTSCalendarProps
        ) => JSX.Element | string | null;
    };
    navigation?: EventNavigation;

    /**
     * @description when a view change, you will get an array of events inside the current selected view.
     */
    onCurrentViewEvents?: (
        events: E[],
        calendarProps: KTSCalendarProps
    ) => void;
}
/**
 * @description a static method to create the same events from a starting date to a final date
 * @param dateRange
 */
// export type CreateEventsFromRange = <E extends IEasyCalendarDefaultEvent>(
//     event: E,
//     dateRange: { start: Date; end: Date },
//     timeRange: { start: EventTime; end: EventTime },
//     excludes?: date[]
// ) => E[];

export type ViewType = 'month' | 'week' | 'day' | 'agenda';

export interface IGridRowForDayView {
    styled: {
        totalTimeSlots: number;
        totalColumns: number;
        totalFractionsInOneHour: number;
        view: ViewType;
        gridRowGap?: number;
        gridColumnGap?: number;
    };
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
export enum DayCellClasses {
    DAY_CELL = 'day-cell',
    IN_FIRST_WEEK = 'in-first-week',
    IN_LAST_WEEK = 'in-last-week',
    WEEK_FIRST_DAY = 'week-first-day',
    WEEK_LAST_DAY = 'week-last-day',
    IN_SELECTED_MONTH = 'in-selected-month',
    TODAY_CELL = 'today-cell',
    CALENDAR_REFERENCE_DAY = 'same-as-calendar-reference-date'
}
