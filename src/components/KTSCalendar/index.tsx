import * as React from 'react';
import {
    DayCellProps,
    KTSCalendarProps,
    EventRenderer,
    CalendarEvent,
    EventsWrapperRendererParams,
    EventRendererParams
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
// import { ReactStandarProps } from 'Common/interfaces';
import {
    // DEFAULT_DATE_FORMAT,
    DEFAULT_DAY_HOURS_RANGE_END,
    DEFAULT_DAY_HOURS_RANGE_START,
    DEFAULT_DATE_FORMAT
    // DEFAULT_TIME_IN_ONE_BLOCK
} from 'Common/constants';
import { dateAreSame } from 'Common/utils';
import CalendarHeader, {
    CalendarHeaderParams
} from 'Components/CalendarHeader';
import DayCellWrapperForMonthView from 'Components/DayCellWrapperForMonthView';
import DayCellForDayView from 'Components/DayCellForDayView';

// const BLOCKS_IN_ONE_HOUR = 60 / DEFAULT_TIME_IN_ONE_BLOCK;
type OwnProps = KTSCalendarProps;
type RFC<T = any> = React.FunctionComponent<T>;
export default class KTSCalendar extends React.Component<OwnProps> {
    static defaultProps: Partial<OwnProps> = {
        daysNames: DEFAULT_DAYS_NAMES,
        monthsNames: DEFAULT_MONTHS_NAMES,
        dayHoursRangeStart: DEFAULT_DAY_HOURS_RANGE_START,
        dayHoursRangeEnd: DEFAULT_DAY_HOURS_RANGE_END,
        weekStartAt: 'monday'
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
            dayHoursRangeEnd = DEFAULT_DAY_HOURS_RANGE_END,
            dayHoursRangeStart = DEFAULT_DAY_HOURS_RANGE_START
        } = this.props;
        const totalTimeSlots = dayHoursRangeEnd - dayHoursRangeStart;
        return (
            this.props.view !== 'month' && (
                <AsideTimesRange styled={{ totalTimeSlots }}>
                    {new Array(totalTimeSlots)
                        .fill(dayHoursRangeStart)
                        .map((h, i) => (
                            <div key={h + i}>{h + i}</div>
                        ))}
                </AsideTimesRange>
            )
        );
    };

    renderCalendar = () => {
        const { view, date } = this.props;
        switch (view) {
            case 'month':
                return this.renderGridForMonthView();
            case 'day':
                return this.renderGridForDayView(date);
            case 'week':
                return this.renderGridForWeekView();
            default:
                return null;
        }
    };

    renderEvent: EventRenderer = cellParams => {
        const { event } = cellParams;
        return (
            <div key={event.date.getTime() + event.title}>{event.title}</div>
        );
    };

    public renderGridHeader = () => {
        const {
            date,
            daysNames = DEFAULT_DAYS_NAMES,
            navigation,
            view
        } = this.props;

        const { startDate } =
            view === 'month'
                ? this.getMonthViewDateRange()
                : this.getWeekViewDateRange(date);

        const weekDates = this.generateDatesInDateRange(
            startDate,
            moment(startDate)
                .add({ days: 6 })
                .toDate()
        );

        const params: CalendarHeaderParams = {
            view,
            weekDates,
            cellDate: view === 'day' ? date : undefined,
            navigation,
            daysNames
        };
        return <CalendarHeader {...params} />;
    };

    renderGridForDayView = (cellDate: Date) => {
        const frmt = moment(cellDate).format('DD-MM-YYYY');
        return (
            <DayCellForDayView
                key={frmt}
                cellDate={cellDate}
                calendarProps={this.props}
            />
        );
    };

    renderMonthEvent: RFC<CalendarEvent> = (event: CalendarEvent) => {
        const { components, date, navigation, events, view } = this.props;
        const cellEvents = events.filter(e =>
            dateAreSame(e.date, event.date, DEFAULT_DATE_FORMAT)
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

    renderGridForMonthView = () => {
        const { weeks, startDate, endDate } = this.getMonthViewDateRange();
        const dates = this.generateDatesInDateRange(startDate, endDate);
        const dayCellPropsgenerator = this.dayCellPropsGenerator();
        const CellWrapper = this.renderDayCellWrapperForMonthView;

        return (
            <CalendarGridForMonthView
                className="grid-for-monthView calendar-grid"
                styled={{ rows: weeks }}
                key="calendar-grid"
            >
                {dates.map((cellDate, i) => {
                    const dayCellProps = dayCellPropsgenerator(cellDate);
                    return (
                        <CellWrapper key={cellDate.getTime()} {...dayCellProps}>
                            {[].map(this.renderMonthEvent)}
                        </CellWrapper>
                    );
                })}
            </CalendarGridForMonthView>
        );
    };

    renderDayCellWrapperForMonthView: RFC<
        EventsWrapperRendererParams
    > = params => {
        const { calendarReferenceDate, cellEvents, navigation, view } = params;

        const { components } = this.props;
        const getInput = (e: CalendarEvent) => ({
            calendarReferenceDate,
            event: e,
            cellEvents,
            navigation,
            view
        });

        const renderEvent =
            components && components.renderEvent
                ? components.renderEvent
                : ({ event }: EventRendererParams) => (
                      <div key={event.date.getTime()}>event</div>
                  );

        const renderEvents = () =>
            cellEvents.map(e => renderEvent(getInput(e)));

        if (components && components.renderEventsWrapper) {
            const Wrapper = components.renderEventsWrapper(params);
            return <Wrapper>{renderEvents()}</Wrapper>;
        }
        const DefaultWrapper = DayCellWrapperForMonthView(params);
        return <DefaultWrapper>{renderEvents()}</DefaultWrapper>;
    };

    public renderGridForWeekView = () => {
        const { date } = this.props;
        const { startDate } = this.getWeekViewDateRange(date);
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
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    position: 'relative',
                    height: '100%'
                }}
            >
                {dates.map(this.renderGridForDayView)}
            </div>
        );
    };

    private dayCellPropsGenerator = () => {
        const { weeks, startDate, endDate } = this.getMonthViewDateRange();
        const { components, date, view } = this.props;
        const today = new Date();
        const dates = this.generateDatesInDateRange(startDate, endDate);
        const events = this.getEventsInRange(startDate, endDate);
        const renderEvent: EventRenderer =
            components && components.renderEvent
                ? components.renderEvent
                : this.renderEvent;
        return (cellDate: Date) => {
            const index = dates.findIndex(d =>
                dateAreSame(d, cellDate, 'YYYYMMDD')
            );
            const cellEvents = this.findDayEvents(events, cellDate);
            const rowIndex = parseInt(`${index / 7}` + '', 10);
            const columnIndex = index % 7;
            const isInSelectedMonth = dateAreSame(date, cellDate, 'YYYYMM');
            const isTodayDate = dateAreSame(today, cellDate, 'YYYYMMDD');

            const dayCellProps: DayCellProps = {
                calendarReferenceDate: date,
                cellDate,
                cellEvents,
                renderEvent,
                columnIndex,
                isInSelectedMonth,
                isTodayDate,
                navigation: this.props.navigation,
                rowIndex,
                view,
                weeks
            };
            return dayCellProps;
        };
    };

    private findDayEvents = (events: OwnProps['events'], d: Date) => {
        return events.filter(({ date }) => {
            return dateAreSame(d, date, 'YYYYMMDD');
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
        const { events } = this.props;
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
        return events.filter(e => {
            const date = moment(e.date);
            return (
                date.isSameOrAfter(startDate) && date.isSameOrBefore(endDate)
            );
        });
    };

    /**
     * @description returns a date range of the month view starting from the nearest monday
     * in the week of the 1rst of the current month and the sunday  in the week of the last day of the month.
     * also it returns the number of weeks within this period
     */
    private getMonthViewDateRange = () => {
        const { weekStartAt, date } = this.props;
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
        if (weekStartAt === 'monday') {
            weekStartDayIndex = 1;
        } else if (weekStartAt === 'sunday' && firstDayIndex !== 7) {
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
        if (weekStartAt === 'sunday') {
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
    //         return dateAreSame(d, date, 'YYYYMM');
    //     });
    // };
}
