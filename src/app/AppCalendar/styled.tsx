import styled from 'styled-components';
import { COLORS } from 'Common/css-constants';

export const AppLayout = styled.div`
    position: relative;
    height: 100vh;
    display: grid;
    grid-template-rows: 4.8rem 1fr;
    /* grid-template-columns: 25rem 1fr; */
    grid-template-areas: 'app-header' 'calendar';
`;

export const HeaderArea = styled.div`
    grid-area: app-header;
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 9rem) 1fr repeat(3, 9rem);
    text-align: center;
`;
export const FilterArea = styled.div`
    grid-area: filter;
    border-right: solid 1px ${COLORS.$cc_grey_ccc};
`;

export const CalendarArea = styled.div`
    grid-area: calendar;
`;

export const NavBtn = styled.span.attrs({ className: 'SC-NavBtn' as string })`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 3px;
    font-size: 11px;
    color: ${COLORS.$cc_grey_777};

    & > * {
        border: solid 1px ${COLORS.$cc_grey_ccc};
        cursor: pointer;
        border-radius: 21px;
        flex-grow: 1;
        height: 30px;
        line-height: 30px;
        padding: 0 6px;
        transition: 0.2s;
        cursor: pointer;
        &.selected {
            background: ${COLORS.$cc_light_blue};
            pointer-events: none;
        }
    }
    &:hover > :not(.selected) {
        border: solid 1px ${COLORS.$cc_light_blue_dark};
        background: ${COLORS.$cc_light_blue};
        color: ${COLORS.$cc_light_blue_dark};
        font-weight: bold;
    }
`;
NavBtn.displayName = 'NavBtn';
