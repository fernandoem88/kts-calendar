import * as React from 'react';
import { DayCellProps, KTSCalendarProps, EventRenderer } from './interfaces';
import moment from 'moment';
import { KTSCalendarContainer, CalendarGridForMonthView } from './styled';
import { DEFAULT_MONTHS_NAMES, DEFAULT_DAYS_NAMES } from './constants';
// import { ReactStandarProps } from 'Common/interfaces';
import {
    // DEFAULT_DATE_FORMAT,
    DEFAULT_DAY_HOURS_RANGE_END,
    DEFAULT_DAY_HOURS_RANGE_START
    // DEFAULT_TIME_IN_ONE_BLOCK
} from 'Common/constants';
import { dateAreSame } from 'Common/utils';
import DayCellForMonthView from 'Components/DayCellForMonthView';
import DayCellsHeader, {
    DayCellsHeaderParams
} from 'Components/DayCellsHeader';

// const BLOCKS_IN_ONE_HOUR = 60 / DEFAULT_TIME_IN_ONE_BLOCK;
type OwnProps = KTSCalendarProps;
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
        return (
            <KTSCalendarContainer className="kts-calendar">
                {this.renderGridHeader()}
                {this.renderCalendar()}
            </KTSCalendarContainer>
        );
    }

    renderCalendar = () => {
        const { view } = this.props;

        return view === 'month' ? this.renderGridForMonthView() : null;
    };

    /**
     * @description get events related to the month of the date props. this value change on date change
     */
    public getSelectedMonthEvents = () => {
        const { events, date } = this.props;
        return events.filter(e => {
            const d = moment(e.date).toDate();
            return dateAreSame(d, date, 'YYYYMM');
        });
    };

    public getEventsInRange = (start: Date, end: Date) => {
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
                : this.getWeekViewDateRange();

        const weekDates = this.generateDatesInDateRange(
            startDate,
            moment(startDate)
                .add({ days: 6 })
                .toDate()
        );

        const params: DayCellsHeaderParams = {
            view,
            weekDates,
            cellDate: view === 'day' ? date : undefined,
            navigation,
            daysNames
        };
        return <DayCellsHeader {...params} />;
    };

    public renderGridForMonthView = () => {
        const { weeks, startDate, endDate } = this.getMonthViewDateRange();
        const dates = this.generateDatesInDateRange(startDate, endDate);
        const dayCellPropsgenerator = this.dayCellPropsGenerator();
        return (
            <CalendarGridForMonthView
                className="grid-for-monthView calendar-grid"
                styled={{ rows: weeks }}
                key="calendar-grid"
            >
                {dates.map((cellDate, i) => {
                    const dayCellProps = dayCellPropsgenerator(cellDate);
                    return (
                        <DayCellForMonthView
                            key={cellDate.getTime()}
                            {...dayCellProps}
                        />
                    );
                })}
            </CalendarGridForMonthView>
        );
    };

    public dayCellPropsGenerator = () => {
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

    renderEvent: EventRenderer = cellParams => {
        const { event } = cellParams;
        return (
            <div key={event.date.getTime() + event.title}>{event.title}</div>
        );
    };

    // public renderGridForDayView = ({
    //     calendarProps,
    //     date,
    //     showDayTopHeader = true,
    //     showLateralHours = true
    // }: {
    //     date: Date;
    //     showLateralHours?: boolean;
    //     showDayTopHeader?: boolean;
    //     calendarProps: OwnProps;
    // }) => {
    //     const {
    //         dayHoursRangeStart = DEFAULT_DAY_HOURS_RANGE_START,
    //         dayHoursRangeEnd = DEFAULT_DAY_HOURS_RANGE_END,
    //         events: evts,
    //         daysNames = DEFAULT_DAYS_NAMES,
    //         view
    //     } = calendarProps;

    //     const totalTimeSlots = dayHoursRangeEnd - dayHoursRangeStart;
    //     const timeSlotsArray = new Array(totalTimeSlots).fill(1);
    //     const events = evts
    //         .filter(e => {
    //             return dateAreSame(e.date, date, DEFAULT_DATE_FORMAT);
    //         })
    //         .sort(({ date: d1 }, { date: d2 }) => {
    //             return d1.getTime() - d2.getTime();
    //         });
    //     const columnsIndexesLastEndTime: EventTime[] = [];
    //     const getGridColumnIndex = ({
    //         startTime: { hh, mm },
    //         endTime: et
    //     }: CalendarEvent) => {
    //         let index = columnsIndexesLastEndTime.findIndex(last => {
    //             return last.hh * 60 + last.mm <= hh * 60 + mm;
    //         });
    //         index = index === -1 ? columnsIndexesLastEndTime.length : index;
    //         columnsIndexesLastEndTime[index] = et;
    //         return index;
    //     };

    //     const isToday = dateAreSame(date, new Date(), 'yyyyMMDD');

    //     const eventsWithColumnIndexes: Array<{
    //         event: IEasyCalendarDefaultEventExtended;
    //         columnIndex: number;
    //     }> = events.map(evt => {
    //         return { event: evt, columnIndex: getGridColumnIndex(evt) };
    //     });
    //     const totalFractionsInOneHour = BLOCKS_IN_ONE_HOUR; // 12
    //     const customerRenderIncludesDayView =
    //         !renderDayEventsExcludes ||
    //         renderDayEventsExcludes.indexOf('day') === -1;

    //     const dateMoment = moment(date);
    //     const dayName =
    //         dateMoment.day() === 0
    //             ? daysNames[6]
    //             : daysNames[dateMoment.day() - 1];
    //     const onHeaderClick = () => {
    //         if (view === 'day') {
    //             return;
    //         }
    //         calendarProps.navigation.onDate(date);
    //         calendarProps.navigation.onView('day');
    //     };
    //     const totalHours = totalTimeSlots;
    //     const Header = renderGridHeader ? (
    //         renderGridHeader(this.props)
    //     ) : (
    //         <GridHeaderForDayView
    //             onClick={onHeaderClick}
    //             className={view === 'day' ? '' : 'clickable'}
    //             style={isToday ? { color: '#65cc33' } : {}}
    //         >
    //             <span>{view === 'week' ? dayName.substr(0, 3) : dayName}</span>
    //             <span>{dateMoment.format('DD')}</span>
    //         </GridHeaderForDayView>
    //     );
    //     return (
    //         <GridForDayView
    //             styled={{ showLateralHours }}
    //             key={dayName}
    //             style={isToday ? { background: '#f4f4f4' } : {}}
    //         >
    //             {showDayTopHeader && Header}
    //             {showLateralHours && (
    //                 <GridAsideForDayView styled={{ totalTimeSlots }}>
    //                     {timeSlotsArray.map((ts, index) => {
    //                         return (
    //                             <div key={index}>{dayStartTime + index}</div>
    //                         );
    //                     })}
    //                 </GridAsideForDayView>
    //             )}
    //             <GridAreaContentForDayEvents>
    //                 <GridEventContainerForDayView className="day-background">
    //                     <GridRowForDayView
    //                         styled={{
    //                             totalFractionsInOneHour: 1,
    //                             totalTimeSlots: totalHours,
    //                             view: 'week',
    //                             totalColumns: 1
    //                         }}
    //                     >
    //                         {new Array(totalHours).fill(1).map((a, i) => (
    //                             <div
    //                                 key={i}
    //                                 style={{
    //                                     borderTop: 'solid 1px #cccccc',
    //                                     color: 'transparent'
    //                                 }}
    //                             >
    //                                 .
    //                             </div>
    //                         ))}
    //                     </GridRowForDayView>
    //                 </GridEventContainerForDayView>
    //                 <GridEventContainerForDayView className="day-events">
    //                     <GridRowForDayView
    //                         styled={{
    //                             totalTimeSlots,
    //                             totalFractionsInOneHour,
    //                             totalColumns:
    //                                 columnsIndexesLastEndTime.length || 1,
    //                             view,
    //                             gridColumnGap: 2,
    //                             gridRowGap: 2
    //                         }}
    //                         style={{ background: 'transparent' }}
    //                     >
    //                         {eventsWithColumnIndexes.map(
    //                             ({ event, columnIndex }, index) => {
    //                                 const start =
    //                                     event.startTime.hh * 60 +
    //                                     event.startTime.mm;
    //                                 const end =
    //                                     event.endTime.hh * 60 +
    //                                     event.endTime.mm;

    //                                 const totalRowsFractions =
    //                                     (end - start) /
    //                                     DEFAULT_TIME_IN_ONE_BLOCK;
    //                                 const rowIndex =
    //                                     (start - dayStartTime * 60) /
    //                                     DEFAULT_TIME_IN_ONE_BLOCK;

    //                                 const dayRendererProps: IDayEventsRendererProps = {
    //                                     events: [event],
    //                                     date,
    //                                     view
    //                                 };
    //                                 return (
    //                                     <GridRowFractionForDayView
    //                                         key={index}
    //                                         styled={{
    //                                             columnIndex,
    //                                             rowIndex,
    //                                             totalRowsFractions
    //                                         }}
    //                                     >
    //                                         {dayEventRenderer(dayRendererProps)}
    //                                     </GridRowFractionForDayView>
    //                                 );
    //                             }
    //                         )}
    //                     </GridRowForDayView>
    //                 </GridEventContainerForDayView>
    //             </GridAreaContentForDayEvents>
    //         </GridForDayView>
    //     );
    // };

    public renderGridForWeekView = () => {
        // const {  weekStartAt,date } = this.props;
        // const { startDate } = this.getWeekViewDateRange(date);
        // const monday = moment(startDate).set({
        //     hours: 0,
        //     minute: 0,
        //     second: 0
        // });

        // const sundDay = monday.clone().add({ days: 7 });
        // const dates = new Array(sundDay.diff(monday, 'days'))
        //     .fill(monday)
        //     .map((m: moment.Moment, i) => {
        //         const c = m.clone().add({ days: i });
        //         return c.toDate();
        //     });

        return 'week';
    };

    public findDayEvents = (events: OwnProps['events'], d: Date) => {
        return events.filter(({ date }) => {
            return dateAreSame(d, date, 'YYYYMMDD');
        });
    };

    /**
     * @description returns a date range of the month view starting from the nearest monday
     * in the week of the 1rst of the current month and the sunday  in the week of the last day of the month.
     * also it returns the number of weeks within this period
     */
    public getMonthViewDateRange = () => {
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

    public getWeekViewDateRange = () => {
        const { date } = this.props;
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

    private generateDatesInDateRange = (startDate: Date, endDate: Date) => {
        const startMoment = moment(startDate);
        const dates = [];
        while (startMoment.isSameOrBefore(endDate)) {
            dates.push(startMoment.toDate());
            startMoment.add({ days: 1 });
        }
        return dates;
    };
}
