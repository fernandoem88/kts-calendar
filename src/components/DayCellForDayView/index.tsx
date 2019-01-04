import * as React from 'react';
import {
    DayCellsContainer,
    DayCellGrid,
    GridRowFractionForDayView,
    GridBackgroundRow,
    EventCardForDayView
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

const DayCellForDayView = ({
    calendarProps,
    cellDate
}: {
    cellDate: Date;
    calendarProps: KTSCalendarProps;
}) => {
    const {
        dayEndHour = DEFAULT_DAY_HOURS_RANGE_END,
        dayStartHour = DEFAULT_DAY_HOURS_RANGE_START,
        daysNames = DEFAULT_DAYS_NAMES,
        events,
        timeFraction = DEFAULT_TIME_IN_ONE_BLOCK,
        view
    } = calendarProps;

    const todayCell = dateAreSame(cellDate, new Date(), 'yyyyMMDD')
        ? ' today-cell'
        : '';
    const totalBlocksInOneHour = 60 / timeFraction; // 12
    const dayName = daysNames[cellDate.getDay()];
    const totalHours = dayEndHour - dayStartHour;
    const columnsIndexesLastEndTime: EventTime[] = [];
    const dayCellEventsWithColumnIndexex = getEventsWithColumnIndexes(
        cellDate,
        events,
        columnsIndexesLastEndTime
    );

    const renderBackgroundRows = (totalColumns: number) =>
        new Array(totalHours).fill(1).map((a, i) => {
            const rowStart = i * totalBlocksInOneHour + 1;
            const rowEnd = rowStart + totalBlocksInOneHour;
            return (
                <GridBackgroundRow
                    key={i}
                    style={{
                        gridRow: `${rowStart}/${rowEnd}`,
                        gridColumn: '1/' + totalColumns
                    }}
                />
            );
        });

    return (
        <DayCellsContainer
            key={dayName}
            className={'day-cells-container' + todayCell}
        >
            <DayCellGrid
                className="day-events-wrapper"
                styled={{
                    totalHours,
                    totalBlocksInOneHour,
                    totalColumns: columnsIndexesLastEndTime.length || 1,
                    view
                    // gridColumnGap: '2px',
                    // gridRowGap: '2px'
                }}
            >
                {renderBackgroundRows(totalBlocksInOneHour)}
                {dayCellEventsWithColumnIndexex.map(
                    ({ event, columnIndex }, index) => {
                        const start =
                            event.startTime.hh * 60 + event.startTime.mm;
                        const end = event.endTime.hh * 60 + event.endTime.mm;

                        const totalRowsFractions =
                            (end - start) / DEFAULT_TIME_IN_ONE_BLOCK;
                        const rowIndex =
                            (start - dayStartHour * 60) /
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
                                <EventCardForDayView>
                                    {event.title}
                                </EventCardForDayView>
                            </GridRowFractionForDayView>
                        );
                    }
                )}
            </DayCellGrid>
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
