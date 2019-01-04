import styled from 'styled-components';
import { DayCellClasses } from 'Components/KTSCalendar/interfaces';

const {
    IN_SELECTED_MONTH,
    IN_LAST_WEEK,
    WEEK_FIRST_DAY,
    TODAY_CELL,
    CALENDAR_REFERENCE_DAY
} = DayCellClasses;
export const MonthCellContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-rows: 1.8rem 1fr;
    &:not(.${WEEK_FIRST_DAY}) {
        border-left: solid 1px #cccccc;
    }
    &:not(.${IN_LAST_WEEK}) {
        border-bottom: solid 1px #cccccc;
    }
    &.${TODAY_CELL}.${IN_SELECTED_MONTH} {
        background: #edf8ff;
    }
    &:not(.${IN_SELECTED_MONTH}) {
        background: #f3f3f3;
    }
    &:hover.${IN_SELECTED_MONTH} {
        background: #ddf2ff;
    }
`;

export const CellHeader = styled.div`
    height: 2.4rem;
    line-height: 2.4rem;
    padding: 0.4rem;
    ${MonthCellContainer}.${CALENDAR_REFERENCE_DAY} & {
        color: #08de3f;
        font-weight: 600;
    }
`;

export const EventsListForMonthView = styled.div`
    position: relative;
    overflow: auto;
`;
