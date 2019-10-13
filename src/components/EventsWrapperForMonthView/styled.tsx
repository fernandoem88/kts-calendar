import styled from 'styled-components';
import { DayCellClasses } from 'Components/KTSCalendar/interfaces';
import { COLORS } from 'Common/css-constants';

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
    &:not(.${IN_SELECTED_MONTH}) {
        background: ${COLORS.$cc_grey_f3f};
    }
    &.${TODAY_CELL}.${IN_SELECTED_MONTH} {
        background: ${COLORS.$cc_light_blue}66;
    }
    &:hover.${IN_SELECTED_MONTH} {
        background: ${COLORS.$cc_light_blue};
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
    cursor: pointer;
    &:hover {
        background: ${COLORS.$cc_light_blue_dark};
    }
`;

export const EventsListForMonthView = styled.div`
    position: relative;
    overflow-y: auto;
    padding: 0.4rem;
`;
