// import * as React from 'react';
// import { KTSCalendarProps } from 'Components/KTSCalendar/interfaces';
// import moment from 'moment';
// import { DEFAULT_DAYS_NAMES } from 'Components/KTSCalendar/constants';
// import { DefaultDayCellForMonthView, DayCellEventsContainer } from './styled';
// import DefaultEventMonthView from 'Components/DefaultEventMonthView';
// import { DayCellProps, defaultDayCellClasses } from './interfaces';
// import { ReactStandarProps } from 'Common/interfaces';

// const DefaultDayCell = (props: DayCellProps & ReactStandarProps) => {
//     const {
//         calendarReferenceDate,
//         cellDate,
//         dayEvents,
//         dayIndex,
//         isInSelectedMonth,
//         // isTodayDate,
//         onDayEventClick,
//         view,
//         weekIndex,
//         weeks
//     } = props;
//     const dateInTheCell = moment(cellDate);

//     const {
//         CALENDAR_REFERENCE_DAY,
//         DAY_CELL,
//         WEEK_FIRST_DAY,
//         IN_FIRST_WEEK,
//         IN_LAST_WEEK,
//         IN_SELECTED_MONTH,
//         WEEK_LAST_DAY,
//         TODAY_CELL
//     } = defaultDayCellClasses;

//     const isCalendarReferenceDate =
//         moment(calendarReferenceDate).format('DD-MM-YYYY') ===
//         dateInTheCell.format('DD-MM-YYYY');

//     const isInFirstWeekClass = weekIndex === 0 ? IN_FIRST_WEEK : null;
//     const isInLastWeekClass = weekIndex === weeks - 1 ? IN_LAST_WEEK : null;

//     const weekStartClass = dayIndex === 0 ? WEEK_FIRST_DAY : null;
//     const weekEndClass = dayIndex === 6 ? WEEK_LAST_DAY : null;
//     const currentMonthClass = isInSelectedMonth ? IN_SELECTED_MONTH : null;
//     const todayDateCellClass = isTodayDate ? TODAY_CELL : null;
//     const isCalendarReferenceDateClass = isCalendarReferenceDate
//         ? CALENDAR_REFERENCE_DAY
//         : null;

//     const classes = [
//         DAY_CELL,
//         isInFirstWeekClass,
//         isInLastWeekClass,
//         currentMonthClass,
//         weekStartClass,
//         weekEndClass,
//         todayDateCellClass,
//         isCalendarReferenceDateClass
//     ].filter(c => c !== null);

//     return view === 'month' ? (
//         <DefaultDayCellForMonthView
//             key={dateInTheCell.format('DD-MM-YYYY')}
//             data-day-name={DEFAULT_DAYS_NAMES[dayIndex].toLowerCase()}
//             data-week-index={weekIndex}
//             data-day-index={dayIndex}
//             className={classes.join(' ')}
//         >
//             {renderDayCellHeader(props)}
//             <DayCellEventsContainer>
//                 <div className="day-cell-events">
//                     {dayEvents.map(
//                         (event: IEasyCalendarDefaultEventExtended) => {
//                             return (
//                                 <DefaultEventMonthView
//                                     key={event.id}
//                                     {...event}
//                                     onDayEventClick={onDayEventClick}
//                                 />
//                             );
//                         }
//                     )}
//                 </div>
//             </DayCellEventsContainer>
//         </DefaultDayCellForMonthView>
//     ) : (
//         <div>no default day cell for {view}</div>
//     );
// };

// const renderDayCellHeader = ({
//     navigation,
//     cellDate,
//     clickableHeader
// }: IDayCellProps) => (
//     <span
//         className={'day-cell-header '}
//         onClick={() => clickableHeader && navigation.onDate(cellDate)}
//     >
//         <span>
//             <span className="date-value">{moment(cellDate).format('D')}</span>
//         </span>
//     </span>
// );

// export default DefaultDayCell;
export default null;
