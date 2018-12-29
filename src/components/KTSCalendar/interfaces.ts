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
        renderEvent?: (
            data: {
                event: E;
                date: Date;
                view: V;
                dayEvents: E[];
                navigation?: EventNavigation;
                viewProps?: any;
            }
        ) => JSX.Element | null | string;
        renderEventsWrapper?: (
            data: {
                date: Date;
                view: V;
                dayEvents: E[];
                navigation?: EventNavigation;
                viewProps?: any;
            }
        ) => JSX.Element | null | string;
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
