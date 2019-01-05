import * as React from 'react';
import {
    DayCellWrapper,
    DayCellGrid,
    GridRowFractionForDayView,
    GridBackgroundRow
} from './styled';
import {
    KTSCalendarProps,
    EventTime,
    EventData,
    RFC,
    EventProps
} from 'Components/KTSCalendar/interfaces';
import {
    DEFAULT_DAY_HOURS_RANGE_START,
    DEFAULT_DAY_HOURS_RANGE_END,
    DEFAULT_DATE_FORMAT,
    DEFAULT_TIME_IN_ONE_BLOCK
} from 'Common/constants';
import { DEFAULT_DAYS_NAMES } from 'Components/KTSCalendar/constants';
import { datesAreSame } from 'Common/utils';
import DayViewDefaultEvent from 'Components/DefaultEventForDayView';

const DayCellForDayView: RFC<{
    cellDate: Date;
    cellEvents: EventData[];
    calendarProps: KTSCalendarProps;
}> = ({ calendarProps, cellDate, cellEvents }) => {
    const {
        components,
        date,
        dayEndHour = DEFAULT_DAY_HOURS_RANGE_END,
        dayStartHour = DEFAULT_DAY_HOURS_RANGE_START,
        daysNames = DEFAULT_DAYS_NAMES,
        eventCategories,
        // events,
        navigation,
        timeFraction = DEFAULT_TIME_IN_ONE_BLOCK,
        view
    } = calendarProps;

    const todayCell = datesAreSame(cellDate, new Date(), 'yyyyMMDD')
        ? ' today-cell'
        : '';
    const totalBlocksInOneHour = 60 / timeFraction; // 12
    const dayName = daysNames[cellDate.getDay()];
    const totalHours = dayEndHour - dayStartHour;
    const columnsIndexesLastEndTime: EventTime[] = [];
    const dayCellEventsWithColumnIndexex = getEventsWithColumnIndexes(
        cellDate,
        cellEvents,
        columnsIndexesLastEndTime
    );
    const totalColumns = columnsIndexesLastEndTime.length || 1;
    const renderEvent =
        components && components.renderEvent && view === 'day'
            ? components.renderEvent
            : DayViewDefaultEvent;
    return (
        <DayCellWrapper
            key={dayName}
            className={'events-wrapper day-view-events-wrapper' + todayCell}
        >
            <DayCellGrid
                className="day-cell"
                styled={{
                    totalHours,
                    totalBlocksInOneHour,
                    totalColumns,
                    view
                }}
            >
                {renderBackgroundRows(
                    totalColumns,
                    totalHours,
                    totalBlocksInOneHour
                )}
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

                        const eventsProps: EventProps = {
                            calendarReferenceDate: date,
                            event,
                            eventCategories,
                            navigation,
                            view
                        };

                        return (
                            <GridRowFractionForDayView
                                key={index}
                                styled={{
                                    columnIndex,
                                    rowIndex,
                                    totalRowsFractions
                                }}
                            >
                                {renderEvent(eventsProps)}
                            </GridRowFractionForDayView>
                        );
                    }
                )}
            </DayCellGrid>
        </DayCellWrapper>
    );
};

const renderBackgroundRows = (
    totalEventsColumns: number,
    totalHours: number,
    totalBlocksInOneHour: number
) => {
    return new Array(totalHours).fill(1).map((a, i) => {
        const rowStart = i * totalBlocksInOneHour + 1;
        const rowEnd = rowStart + totalBlocksInOneHour;
        return (
            <GridBackgroundRow
                key={i}
                style={{
                    gridRow: `${rowStart}/${rowEnd}`,
                    gridColumn: '1/' + (totalEventsColumns + 2)
                }}
                className="day-cell-background"
            />
        );
    });
};

const getEventsWithColumnIndexes = (
    cellDate: Date,
    evts: EventData[],
    columnsIndexesLastEndTime: EventTime[]
) => {
    const events = evts
        .filter(e => {
            return datesAreSame(e.date, cellDate, DEFAULT_DATE_FORMAT);
        })
        .sort(({ date: d1 }, { date: d2 }) => {
            return d1.getTime() - d2.getTime();
        });
    const eventsWithColumnIndexes: Array<{
        event: EventData;
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
    { startTime: { hh, mm }, endTime: et }: EventData,
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
