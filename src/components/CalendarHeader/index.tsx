import React from 'react';
import {
    ViewType,
    CalendarHeaderParams
} from 'Components/KTSCalendar/interfaces';
import { CalendarHeaderContainer } from './styled';
import moment from 'moment';

const CalendarHeader = (props: CalendarHeaderParams) => {
    const { daysNames, navigation, view, weekDates } = props;
    const getDayName = (d: Date) => {
        const index = d.getDay();
        const dayName = daysNames[index];
        const date = moment(d).format(' YYYY/MM/DD');
        return view === 'month' ? dayName : dayName.substr(0, 3) + date;
    };

    return (
        <CalendarHeaderContainer className="day-cell-header" data-view={view}>
            {weekDates.map((d, i) => {
                const gridColumn =
                    i === 0 && view !== 'month' ? { gridColumn: '1/3' } : {};
                return (
                    <div
                        key={i}
                        style={gridColumn}
                        onClick={getOnClick(d, view, navigation)}
                    >
                        {getDayName(d)}
                    </div>
                );
            })}
        </CalendarHeaderContainer>
    );
};

const getOnClick = (
    cellDate: Date,
    view: ViewType,
    navigation: CalendarHeaderParams['navigation']
) => {
    if (view === 'day' || !navigation) {
        return undefined;
    }
    return () => {
        if (navigation.onView) {
            navigation.onView('day');
        }
        if (navigation.onDate && cellDate) {
            navigation.onDate(cellDate);
        }
    };
};

export default CalendarHeader;
