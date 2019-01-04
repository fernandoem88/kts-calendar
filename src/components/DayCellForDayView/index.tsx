import * as React from 'react';
import {
    DayCellsContainer,
    DayCellGrid,
    GridRowFractionForDayView,
    GridBackgroundRow
} from './styled';
import {
    KTSCalendarProps,
    EventTime,
    CalendarEvent
} from 'Components/KTSCalendar/interfaces';
import {
    DEFAULT_DAY_HOURS_RANGE_START,
    DEFAULT_DAY_HOURS_RANGE_END,
    DEFAULT_DATE_FORMAT,
    DEFAULT_TIME_IN_ONE_BLOCK
} from 'Common/constants';
import { DEFAULT_DAYS_NAMES } from 'Components/KTSCalendar/constants';
import { dateAreSame } from 'Common/utils';
const BLOCKS_IN_ONE_HOUR = 60 / DEFAULT_TIME_IN_ONE_BLOCK;

const DayCellForDayView = ({
    calendarProps,
    cellDate
}: {
    cellDate: Date;
    calendarProps: KTSCalendarProps;
}) => {
    const {
        dayHoursRangeStart = DEFAULT_DAY_HOURS_RANGE_START,
        dayHoursRangeEnd = DEFAULT_DAY_HOURS_RANGE_END,
        events,
        daysNames = DEFAULT_DAYS_NAMES,
        view
    } = calendarProps;
    const isToday = dateAreSame(cellDate, new Date(), 'yyyyMMDD');
    const totalFractionsInOneHour = BLOCKS_IN_ONE_HOUR; // 12
    const dayName = daysNames[cellDate.getDay()];
    const totalHours = dayHoursRangeEnd - dayHoursRangeStart;
    const columnsIndexesLastEndTime: EventTime[] = [];
    const dayCellEventsWithColumnIndexex = getEventsWithColumnIndexes(
        cellDate,
        events,
        columnsIndexesLastEndTime
    );
    return (
        <DayCellsContainer
            key={dayName}
            style={isToday ? { background: '#f4f4f4' } : {}}
        >
            <div className="backGround">
                <DayCellGrid
                    className="day-background"
                    styled={{
                        totalColumns: 1,
                        totalFractionsInOneHour: 1,
                        totalHours,
                        view: 'week'
                    }}
                >
                    {new Array(totalHours).fill(1).map((a, i) => (
                        <GridBackgroundRow key={i} />
                    ))}
                </DayCellGrid>
            </div>
            <div className="events-wrapper">
                <DayCellGrid
                    className="day-events"
                    styled={{
                        totalHours,
                        totalFractionsInOneHour,
                        totalColumns: columnsIndexesLastEndTime.length || 1,
                        view,
                        gridColumnGap: '2px',
                        gridRowGap: '2px'
                    }}
                >
                    {dayCellEventsWithColumnIndexex.map(
                        ({ event, columnIndex }, index) => {
                            const start =
                                event.startTime.hh * 60 + event.startTime.mm;
                            const end =
                                event.endTime.hh * 60 + event.endTime.mm;

                            const totalRowsFractions =
                                (end - start) / DEFAULT_TIME_IN_ONE_BLOCK;
                            const rowIndex =
                                (start - dayHoursRangeStart * 60) /
                                DEFAULT_TIME_IN_ONE_BLOCK;

                            return (
                                <GridRowFractionForDayView
                                    key={index}
                                    styled={{
                                        columnIndex,
                                        rowIndex,
                                        totalRowsFractions
                                    }}
                                >
                                    <div>Event</div>
                                </GridRowFractionForDayView>
                            );
                        }
                    )}
                </DayCellGrid>
            </div>
        </DayCellsContainer>
    );
};

const getEventsWithColumnIndexes = (
    cellDate: Date,
    evts: CalendarEvent[],
    columnsIndexesLastEndTime: EventTime[]
) => {
    const events = evts
        .filter(e => {
            return dateAreSame(e.date, cellDate, DEFAULT_DATE_FORMAT);
        })
        .sort(({ date: d1 }, { date: d2 }) => {
            return d1.getTime() - d2.getTime();
        });
    const eventsWithColumnIndexes: Array<{
        event: CalendarEvent;
        columnIndex: number;
    }> = events.map(evt => {
        return {
            event: evt,
            columnIndex: getGridColumnIndex(evt, columnsIndexesLastEndTime)
        };
    });

    return eventsWithColumnIndexes;
};

const getGridColumnIndex = (
    { startTime: { hh, mm }, endTime: et }: CalendarEvent,
    columnsIndexesLastEndTime: EventTime[]
) => {
    let index = columnsIndexesLastEndTime.findIndex(last => {
        return last.hh * 60 + last.mm <= hh * 60 + mm;
    });
    index = index === -1 ? columnsIndexesLastEndTime.length : index;
    columnsIndexesLastEndTime[index] = et;
    return index;
};

export default DayCellForDayView;
