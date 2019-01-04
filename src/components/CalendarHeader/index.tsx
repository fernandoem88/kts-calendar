import React from 'react';
import {
    ViewType,
    EventNavigation,
    DaysArray
} from 'Components/KTSCalendar/interfaces';
import { CalendarHeaderStyle } from './styled';
import moment from 'moment';

export type CalendarHeaderParams = {
    daysNames: DaysArray;
    weekDates: Date[];
    cellDate?: Date;
    view: ViewType;
    navigation?: EventNavigation;
};
const CalendarHeader = (props: CalendarHeaderParams) => {
    const { cellDate, daysNames, view, weekDates } = props;
    const getDayName = (d: Date) => {
        const index = d.getDay();
        const dayName = daysNames[index];
        const date = moment(d).format(' YYYY/MM/DD');
        return view === 'month' ? dayName : dayName.substr(0, 3) + date;
    };
    if (view === 'day') {
        return (
            <CalendarHeaderStyle className="day-cell-header" data-view={view}>
                {cellDate && <div>{getDayName(cellDate)}</div>}
            </CalendarHeaderStyle>
        );
    }
    return (
        <CalendarHeaderStyle className="day-cell-header" data-view={view}>
            {weekDates.map((d, i) => {
                const gridColumn =
                    i === 0 && view !== 'month' ? { gridColumn: '1/3' } : {};
                return (
                    <div key={i} style={gridColumn}>
                        {getDayName(d)}
                    </div>
                );
            })}
        </CalendarHeaderStyle>
    );
};

export default CalendarHeader;
