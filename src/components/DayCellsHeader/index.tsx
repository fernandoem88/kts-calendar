import React from 'react';
import {
    ViewType,
    EventNavigation,
    DaysArray
} from 'Components/KTSCalendar/interfaces';
import { DayCellsHeaderStyle } from './styled';

export type DayCellsHeaderParams = {
    daysNames: DaysArray;
    weekDates: Date[];
    cellDate?: Date;
    view: ViewType;
    navigation?: EventNavigation;
};
const DayCellsHeader = (props: DayCellsHeaderParams) => {
    const { cellDate, daysNames, view, weekDates } = props;
    const getDayName = (d: Date) => {
        const index = d.getDay();
        const dayName = daysNames[index];
        return view === 'day' ? dayName : dayName.substr(0, 3);
    };
    if (view === 'day') {
        return (
            <DayCellsHeaderStyle className="day-cell-header">
                {cellDate && <div>{getDayName(cellDate)}</div>}
            </DayCellsHeaderStyle>
        );
    }
    return (
        <DayCellsHeaderStyle className="day-cell-header">
            {weekDates.map((d, i) => (
                <div key={i}>{getDayName(d)}</div>
            ))}
        </DayCellsHeaderStyle>
    );
};

export default DayCellsHeader;
