import React from 'react';
import {
    EventsWrapperRenderer,
    EventsWrapperRendererParams,
    DayCellClasses
} from 'Components/KTSCalendar/interfaces';
import { dateAreSame } from 'Common/utils';
import {
    MonthCellContainer,
    CellHeader,
    EventsListForMonthView
} from './styled';

const DayCellWrapperForMonthView: EventsWrapperRenderer = wrapperProps => {
    const {
        calendarReferenceDate,
        cellDate,
        // cellEvents,
        columnIndex,
        isInSelectedMonth,
        isTodayDate,
        rowIndex,
        weeks
    }: EventsWrapperRendererParams = wrapperProps;
    const classes: string[] = [DayCellClasses.DAY_CELL];
    if (dateAreSame(cellDate, calendarReferenceDate, 'YYYYMMDD')) {
        classes.push(DayCellClasses.CALENDAR_REFERENCE_DAY);
    }
    if (rowIndex === 0) {
        classes.push(DayCellClasses.IN_FIRST_WEEK);
    }
    if (rowIndex === weeks - 1) {
        classes.push(DayCellClasses.IN_LAST_WEEK);
    }
    if (isInSelectedMonth) {
        classes.push(DayCellClasses.IN_SELECTED_MONTH);
    }
    if (isTodayDate) {
        classes.push(DayCellClasses.TODAY_CELL);
    }
    if (columnIndex === 0) {
        classes.push(DayCellClasses.WEEK_FIRST_DAY);
    }
    if (columnIndex === 6) {
        classes.push(DayCellClasses.WEEK_LAST_DAY);
    }

    return (props: any = {}) =>
        dateAreSame(calendarReferenceDate, cellDate, 'YYYYMM') ? (
            <MonthCellContainer className={classes.join(' ')}>
                <CellHeader>{cellDate.getDate()}</CellHeader>
                <EventsListForMonthView>
                    {props.children || null}
                </EventsListForMonthView>
            </MonthCellContainer>
        ) : (
            <MonthCellContainer className={classes.join(' ')} />
        );
};

export default DayCellWrapperForMonthView;
