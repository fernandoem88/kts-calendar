// import styled, { css } from 'styled-components';
// import { COLORS } from 'Common/css-constants';
// import { defaultDayCellClasses } from 'Components/DefaultDayCell/interfaces';

// export const MiniCalendarContainer = styled.div`
//     padding: 2.7rem 0;
//     font-size: 1rem;
//     text-align: center;
//     color: #000000;
//     font-weight: 500;
//     user-select: none;
// `;

// export const MiniCalendarGridHeader = styled.span`
//     font-weight: 600;
//     text-transform: uppercase;
// `;

// const {
//     TODAY_CELL,
//     IN_SELECTED_MONTH,
//     CALENDAR_REFERENCE_DAY,
//     WEEK_LAST_DAY
// } = defaultDayCellClasses;

// export const minicalendarDayCellCSSForMonthView = css`
//     cursor: default;
//     &.${TODAY_CELL} {
//         & span.date-value {
//             font-size: 1.1rem;
//             font-weight: 600;
//             background: ${COLORS.$cc_green_primary_transp_1};
//         }
//     }

//     &:not(.${IN_SELECTED_MONTH}) {
//         color: ${COLORS.$cc_grey_c3c};
//         & .day-cell-events {
//             opacity: 0.5;
//             pointer-events: none;
//         }
//     }
//     &.${CALENDAR_REFERENCE_DAY + '::after'}{
//         content: ' ';
//         position: absolute;
//         width: 60%;
//         background: ${COLORS.$cc_green_primary};
//         height: 2px;
//         top: 0;
//         left: 20%;
//         /* border-top: solid 1px ${COLORS.$cc_green_primary}; */
//     }
//     &.${WEEK_LAST_DAY} {
//         color: red;
//         &:not(.${IN_SELECTED_MONTH}) {
//             color: #ff000066;
//         }
//     }
//     &:hover {
//         background: ${COLORS.$cc_grey_faf};
//     }
// `;

// export const MiniCalendarTools = styled.div`
//     display: grid;
//     height: 3rem;
//     grid-template-columns: 60% 40%;
//     padding: 0 1.2rem;
// `;

// export const MiniCalendarToolsTitle = styled.div`
//     font-size: 1.2rem;
//     text-align: left;
//     font-weight: 600;
// `;

// export const MiniCalendarArrows = styled.div`
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     text-align: right;
// `;
