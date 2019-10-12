import * as React from 'react';
import {
    KTSCalendarProps,
    Event,
    EventData,
    EventsWrapperProps,
    EventProps,
    CalendarHeaderParams,
    RFC
} from './interfaces';
import moment from 'moment';
import {
    KTSCalendarArea,
    CalendarGridForMonthView,
    KTSCalendarLayout,
    AsideTimesRange,
    CalendarHeaderArea
} from './styled';
import { DEFAULT_MONTHS_NAMES, DEFAULT_DAYS_NAMES } from './constants';
import {
    DEFAULT_DAY_HOURS_RANGE_END,
    DEFAULT_DAY_HOURS_RANGE_START,
    DEFAULT_DATE_FORMAT
} from 'Common/constants';
import { datesAreSame } from 'Common/utils';
import EventsWrapperForMonthView from 'Components/EventsWrapperForMonthView';
import DayCellForDayView from 'Components/DayCellForDayView';
import CalendarHeader from 'Components/CalendarHeader';
import DefaultEventForMonthView, {
    DefaultEventForMonthViewProps
} from 'Components/DefaulEventForMonthView';

type OwnProps = KTSCalendarProps;
export default class KTSCalendar extends React.Component<OwnProps> {
    static defaultProps: Partial<OwnProps> = {
        daysNames: DEFAULT_DAYS_NAMES,
        monthsNames: DEFAULT_MONTHS_NAMES,
        dayStartHour: DEFAULT_DAY_HOURS_RANGE_START,
        dayEndHour: DEFAULT_DAY_HOURS_RANGE_END,
        weekStartFrom: 'monday'
    };
    constructor(props: OwnProps) {
        super(props);
    }

    render() {
        const { view } = this.props;

        return (
            <KTSCalendarLayout data-view={view}>
                {this.renderAsideTimesRange()}
                <CalendarHeaderArea>
                    {this.renderGridHeader()}
                </CalendarHeaderArea>
                <KTSCalendarArea className="kts-calendar">
                    {this.renderCalendar()}
                </KTSCalendarArea>
            </KTSCalendarLayout>
        );
    }

    renderAsideTimesRange = () => {
        const {
            dayEndHour = DEFAULT_DAY_HOURS_RANGE_END,
            dayStartHour = DEFAULT_DAY_HOURS_RANGE_START
        } = this.props;
        const totalHours = dayEndHour - dayStartHour;
        return (
            this.props.view !== 'month' && (
                <AsideTimesRange styled={{ totalHours: totalHours * 12 }}>
                    {new Array(totalHours).fill(dayStartHour).map((h, i) => {
                        const rowStart = i * 12 + 1;
                        const rowEnd = rowStart + 12;
                        const gridRow = `${rowStart}/${rowEnd}`;
                        return (
                            <div
                                key={h + i}
                                style={{ gridRow, padding: '0 4px' }}
                            >
                                {h + i}
                            </div>
                        );
                    })}
                </AsideTimesRange>
            )
        );
    };

    renderCalendar = () => {
        const { view, date } = this.props;
        switch (view) {
            case 'month':
                return this.renderMonthGrid();
            case 'day': {
                const eventsWrapperProps = this.eventsWrapperPropsGenerator()(
                    date
                );
                return this.renderDayGrid(eventsWrapperProps);
            }
            case 'week':
                return this.renderWeekGrid();
            default:
                return null;
        }
    };

    renderEvent: Event = cellParams => {
        const { event } = cellParams;
        return (
            <div key={event.date.getTime() + event.title}>{event.title}</div>
        );
    };

    public renderGridHeader = () => {
        const {
            components,
            date,
            daysNames = DEFAULT_DAYS_NAMES,
            navigation,
            view
        } = this.props;

        const { startDate } =
            view === 'month'
                ? this.getMonthViewDateRange()
                : this.getWeekViewDateRange(date);

        const weekDates =
            view === 'day'
                ? [date]
                : this.generateDatesInDateRange(
                      startDate,
                      moment(startDate)
                          .add({ days: 6 })
                          .toDate()
                  );

        const params: CalendarHeaderParams = {
            view,
            weekDates,
            navigation,
            daysNames
        };
        if (components && components.renderGridHeader) {
            return components.renderGridHeader(params);
        }
        return <CalendarHeader {...params} />;
    };

    renderDayGrid = (eventsWrapperProps: EventsWrapperProps) => {
        const { cellDate, cellEvents } = eventsWrapperProps;
        const frmt = moment(cellDate).format('DD-MM-YYYY');
        return (
            <DayCellForDayView
                key={frmt}
                cellDate={cellDate}
                cellEvents={cellEvents}
                calendarProps={this.props}
            />
        );
    };

    renderMonthEvent: RFC<EventData> = (event: EventData) => {
        const { components, date, navigation, events, view } = this.props;
        const cellEvents = events.filter(e =>
            datesAreSame(e.date, event.date, DEFAULT_DATE_FORMAT)
        );
        const renderEvents = components ? components.renderEvent : null;
        if (renderEvents) {
            const Ev = renderEvents;
            const data = {
                calendarReferenceDate: date,
                cellEvents,
                event,
                navigation,
                view
            };
            return <Ev {...data} key={event.date.getTime()} />;
        }
        return <div key={event.date.getTime()}>event</div>;
    };

    /**
     * @description render the grid layout for month view
     */
    renderMonthGrid = () => {
        const { weeks, startDate, endDate } = this.getMonthViewDateRange();
        const dates = this.generateDatesInDateRange(startDate, endDate);
        const eventsWrapperPropsGenerator = this.eventsWrapperPropsGenerator();
        const CellWrapper = this.renderEventsWrapperForMonthView;
        return (
            <CalendarGridForMonthView
                className="grid-for-monthView calendar-grid"
                styled={{ rows: weeks }}
                key="calendar-grid"
            >
                {dates.map((cellDate, i) => {
                    const dayCellProps = eventsWrapperPropsGenerator(cellDate);
                    return (
                        <CellWrapper
                            key={cellDate.getTime()}
                            {...dayCellProps}
                        />
                    );
                })}
            </CalendarGridForMonthView>
        );
    };

    renderDefaultEventForMonthView = ({ event }: EventProps) => {
        const props: DefaultEventForMonthViewProps = {
            eventCategories: [],
            eventData: event
        };
        return <DefaultEventForMonthView {...props} />;
    };

    renderEventsWrapperForMonthView: RFC<EventsWrapperProps> = params => {
        const { calendarReferenceDate, cellEvents, navigation } = params;
        const { components, view } = this.props;
        const getInput = (e: EventData) => ({
            calendarReferenceDate,
            event: e,
            cellEvents,
            navigation,
            view
        });

        const renderEvent =
            components && components.renderEvent
                ? components.renderEvent
                : this.renderDefaultEventForMonthView;

        const renderEvents = () =>
            cellEvents.map(e => renderEvent(getInput(e)));

        if (view === 'month' && components && components.renderEventsWrapper) {
            const Wrapper = components.renderEventsWrapper(params);
            return <Wrapper>{renderEvents()}</Wrapper>;
        }
        const DefaultWrapper = EventsWrapperForMonthView(params);
        return <DefaultWrapper>{renderEvents()}</DefaultWrapper>;
    };

    /**
     * @description render the grid layout for week view
     */
    public renderWeekGrid = () => {
        const { date } = this.props;
        const { startDate } = this.getWeekViewDateRange(date);
        const eventsWrapperPropsGenerator = this.eventsWrapperPropsGenerator();
        const monday = moment(startDate).set({
            hours: 0,
            minute: 0,
            second: 0
        });

        const sundDay = monday.clone().add({ days: 7 });
        const dates = new Array(sundDay.diff(monday, 'days'))
            .fill(monday)
            .map((m: moment.Moment, i) => {
                const c = m.clone().add({ days: i });
                return c.toDate();
            });

        return (
            <div
                className="grid-container week-view-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    position: 'relative',
                    height: '100%'
                }}
            >
                {dates.map(d => {
                    const eventsWrapperProps = eventsWrapperPropsGenerator(d);
                    return this.renderDayGrid(eventsWrapperProps);
                })}
            </div>
        );
    };

    private eventsWrapperPropsGenerator = () => {
        const { date, view } = this.props;
        const { weeks, startDate, endDate } =
            view === 'month'
                ? this.getMonthViewDateRange()
                : view === 'week'
                ? this.getWeekViewDateRange(date)
                : { endDate: date, startDate: date, weeks: 1 };
        const today = new Date();
        const dates =
            view === 'day'
                ? [date]
                : this.generateDatesInDateRange(startDate, endDate);
        const events = this.getEventsInRange(startDate, endDate);
        return (cellDate: Date) => {
            const cellEvents = this.findDayEvents(events, cellDate);
            const isInSelectedMonth = datesAreSame(date, cellDate, 'YYYYMM');
            const isTodayDate = datesAreSame(today, cellDate, 'YYYYMMDD');
            const index = dates.findIndex(d =>
                datesAreSame(d, cellDate, 'YYYYMMDD')
            );
            const rowIndex = parseInt(`${index / 7}` + '', 10);
            const columnIndex = index % 7;

            const eventsWrapperProps: EventsWrapperProps = {
                calendarReferenceDate: date,
                cellDate,
                cellEvents,
                columnIndex,
                isInSelectedMonth,
                isTodayDate,
                navigation: this.props.navigation,
                rowIndex,
                view,
                weeks
            };
            return eventsWrapperProps;
        };
    };

    private findDayEvents = (events: OwnProps['events'], d: Date) => {
        return events.filter(({ date }) => {
            return datesAreSame(d, date, 'YYYYMMDD');
        });
    };

    private generateDatesInDateRange = (startDate: Date, endDate: Date) => {
        const startMoment = moment(startDate);
        const dates = [];
        while (startMoment.isSameOrBefore(endDate)) {
            dates.push(startMoment.toDate());
            startMoment.add({ days: 1 });
        }
        return dates;
    };

    private getEventsInRange = (start: Date, end: Date) => {
        const {
            events,
            dayStartHour = DEFAULT_DAY_HOURS_RANGE_START,
            dayEndHour = DEFAULT_DAY_HOURS_RANGE_END
        } = this.props;
        const startDate = moment(start).set({
            hours: 0,
            minutes: 0,
            seconds: 0
        });
        const endDate = moment(end).set({
            hours: 23,
            minutes: 59,
            seconds: 59
        });

        console.log(
            `getEventsInRange: ${startDate.format(
                'DD/MM/YYYY HH:mm'
            )} - ${endDate.format('DD/MM/YYYY HH:mm')}`
        );
        return events
            .filter(e => {
                const date = moment(e.date);
                const startTime = e.startTime.hh;
                return (
                    date.isSameOrAfter(startDate) &&
                    date.isSameOrBefore(endDate) &&
                    startTime >= dayStartHour &&
                    startTime < dayEndHour
                );
            })
            .sort(
                (
                    { startTime: st1, endTime: et1 },
                    { startTime: st2, endTime: et2 }
                ) => {
                    const s1 = st1.hh * 60 + st1.mm;
                    const s2 = st2.hh * 60 + st2.mm;
                    if (s1 === s2) {
                        const e1 = et1.hh * 60 + et1.mm;
                        const e2 = et2.hh * 60 + et2.mm;
                        return e1 - e2;
                    } else {
                        return s1 - s2;
                    }
                }
            );
    };

    /**
     * @description returns a date range of the month view starting from the nearest monday
     * in the week of the 1rst of the current month and the sunday  in the week of the last day of the month.
     * also it returns the number of weeks within this period
     */
    private getMonthViewDateRange = () => {
        const { weekStartFrom, date } = this.props;
        const now = moment(date);
        // starting at the first of month
        const firstOfCurrentMonthDate = now.set({
            date: 1,
            hour: 0,
            minute: 0,
            second: 0
        });
        const firstDayIndex = firstOfCurrentMonthDate.toDate().getDay() || 7; // 0 to 6
        const startDate = firstOfCurrentMonthDate.clone();
        const firstOfNextMonth = startDate.clone().add({ months: 1 });

        let weekStartDayIndex = firstDayIndex;
        if (weekStartFrom === 'monday') {
            weekStartDayIndex = 1;
        } else if (weekStartFrom === 'sunday' && firstDayIndex !== 7) {
            weekStartDayIndex = 0;
        }

        // the diff between the week starting day and the first of month day
        const weekStartDayDiff = firstDayIndex - weekStartDayIndex;

        // the calendar month view must starts at monday or sunday
        startDate.subtract({ days: weekStartDayDiff });

        const nextMonthFirstDay = firstOfNextMonth.toDate().getDay() || 7;

        // the end of month by default is sunday if the week starts on monday
        const endDate =
            nextMonthFirstDay === 7
                ? firstOfNextMonth
                : nextMonthFirstDay === 1
                ? firstOfNextMonth.subtract({ days: 1 })
                : firstOfNextMonth.add({ days: 7 - nextMonthFirstDay });
        if (weekStartFrom === 'sunday') {
            // the end of month in this case must be saturday
            endDate.subtract({ days: 1 });
        }
        const weeks = endDate.diff(startDate, 'weeks') + 1;
        return {
            startDate: startDate.toDate(),
            endDate: endDate.toDate(),
            weeks
        };
    };

    private getWeekViewDateRange = (date: Date) => {
        const { startDate } = this.getMonthViewDateRange();
        const mmtStart = moment(startDate);
        const mmtEnd = mmtStart.clone().add({ days: 6 });

        while (mmtEnd.isBefore(date)) {
            mmtStart.add({ weeks: 1 });
            mmtEnd.add({ weeks: 1 });
        }

        return {
            startDate: mmtStart.toDate(),
            endDate: mmtEnd.toDate(),
            weeks: 1
        };
    };

    // /**
    //  * @description get events related to the month of the date props. this value change on date change
    //  */
    // private getSelectedMonthEvents = () => {
    //     const { events, date } = this.props;
    //     return events.filter(e => {
    //         const d = moment(e.date).toDate();
    //         return datesAreSame(d, date, 'YYYYMM');
    //     });
    // };
}
