import React from 'react';
import {
    EventsWrapper,
    EventsWrapperProps,
    DayCellClasses
} from 'Components/KTSCalendar/interfaces';
import { datesAreSame } from 'Common/utils';
import {
    MonthCellContainer,
    CellHeader,
    EventsListForMonthView
} from './styled';

const EventsWrapperForMonthView: EventsWrapper = wrapperProps => {
    const {
        calendarReferenceDate,
        cellDate,
        columnIndex,
        isInSelectedMonth,
        isTodayDate,
        rowIndex,
        weeks
    }: EventsWrapperProps = wrapperProps;
    const classes: string[] = [DayCellClasses.DAY_CELL];
    if (datesAreSame(cellDate, calendarReferenceDate, 'YYYYMMDD')) {
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

    const setViewAndDate = getOnClick(wrapperProps);

    return (props: any = {}) =>
        datesAreSame(calendarReferenceDate, cellDate, 'YYYYMM') ? (
            <MonthCellContainer className={classes.join(' ')}>
                <CellHeader onClick={setViewAndDate}>
                    {cellDate.getDate()}
                </CellHeader>
                <EventsListForMonthView>
                    {props.children || null}
                </EventsListForMonthView>
            </MonthCellContainer>
        ) : (
            <MonthCellContainer
                className={classes.join(' ')}
                onClick={setViewAndDate}
            />
        );
};

const getOnClick = ({ navigation, cellDate }: EventsWrapperProps) => {
    const onDate =
        navigation && navigation.onDate ? navigation.onDate : undefined;
    const onView =
        navigation && navigation.onView ? navigation.onView : undefined;
    if (!onDate && !onView) {
        return undefined;
    }

    const setViewAndDate = () => {
        if (onDate) {
            onDate(cellDate);
        }
        if (onView) {
            onView('day');
        }
    };
    return setViewAndDate;
};

export default EventsWrapperForMonthView;
