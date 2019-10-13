import styled from 'styled-components';
import { DayCellClasses } from 'Components/KTSCalendar/interfaces';

export const DayViewDefaultEventContainer = styled.div`
    position: relative;
    /* &[data-view='day'] {
        width: 25rem;
    } */
    background: ${props => props.color};
    height: 100%;
    overflow: auto;
    font-size: 1.2rem;
`;

export const DayViewDefaultEventTitle = styled.div`
    padding: 0.4rem;
    height: 2.4rem;
    & > span {
        margin-right: 0.4rem;
        &.value {
            font-weight: 600;
        }
    }
    ${DayViewDefaultEventContainer}.${DayCellClasses.PAST_EVENT_CELL} & {
        text-decoration: line-through;
    }
`;

export const DayViewDefaultEventDescription = styled.div`
    padding: 0.4rem;
`;
