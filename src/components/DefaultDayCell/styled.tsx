import styled, { css } from 'styled-components';
import { COLORS } from 'Common/css-constants';
import { defaultDayCellClasses } from './interfaces';

const DFMV = styled.div<{
    styledProps?: { css?: string | ReturnType<typeof css> };
}>``;
export const DefaultDayCellForMonthView = styled(DFMV)`
    position: relative;
    width: 100%;
    display: grid;
    grid-template-rows: 2rem 1fr;
    /* overflow-y: auto; */
    overflow-x: hidden;
    ${({ styledProps: sp }) => (sp && sp.css ? sp.css : '')}
`;

const {
    WEEK_FIRST_DAY,
    IN_FIRST_WEEK,
    IN_SELECTED_MONTH,
    TODAY_CELL
} = defaultDayCellClasses;

export const defaultDayCellCSSForMonthView = css`
    color: ${COLORS.$cc_grey_777};
    &:not(.${WEEK_FIRST_DAY}) {
        border-left: solid 1px ${COLORS.$cc_grey_ccc};
    }

    &:not(.${IN_FIRST_WEEK}) {
        border-top: solid 1px ${COLORS.$cc_grey_ccc};
    }
    &.${TODAY_CELL} {
        & span.date-value {
            background: ${COLORS.$cc_green_primary};
            color: white;
            border-radius: 50%;
            font-size: 1.1rem;
            width: 2rem;
            display: inline-block;
            text-align: center;
        }
    }

    &:not(.${IN_SELECTED_MONTH}) {
        background: ${COLORS.$cc_grey_faf};
        color: ${COLORS.$cc_grey_c3c};
        & .day-cell-events {
            opacity: 0.5;
            /* pointer-events: none; */
        }
    }
    & > span {
        position: relative;
        font-weight: 600;
        & > span {
            position: absolute;
            height: 100%;
            font-size: 1.4rem;
            padding-left: 0.4rem;
        }
        & .date-value {
            line-height: 2rem;
        }
    }
`;

export const DayCellEventsContainer = styled.div`
    position: relative;
    overflow-y: auto;
    width: 100%;
    & > .day-cell-events {
        position: absolute;
        width: 100%;
        padding-bottom: 0.4rem;
    }
`;

export const DayHeaderCellForMonthView = styled.span`
    &.mini-calendar {
        font-size: 1rem;
    }
`;
