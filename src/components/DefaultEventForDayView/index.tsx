// import * as React from 'react';
// import moment from 'moment';
// import {
//     DefaultEventForDayViewContainer,
//     DefaultEventForDayViewTitle,
//     DefaultEventForDayViewDescription
// } from './styled';

// const DefaultEventForDayView = ({
//     date,
//     event,
//     view
// }: {
//     event: IEasyCalendarDefaultEventExtended;
//     view: TViewType;
//     date: Date;
// }) => {
//     const { labelColor, title, endTime, startTime } = event;
//     const eventStartMoment = moment(date).set({
//         hours: startTime.hh,
//         minutes: startTime.mm
//     });
//     const eventEndMoment = moment(date).set({
//         hours: endTime.hh,
//         minutes: endTime.mm
//     });
//     return (
//         <DefaultEventForDayViewContainer color={labelColor}>
//             <DefaultEventForDayViewTitle className="eventTitle">
//                 <span className="from title">From</span>
//                 <span className="from value">
//                     {eventStartMoment.format('HH:mm')}
//                 </span>
//                 <span className="to title">To</span>
//                 <span className="to value">
//                     {eventEndMoment.format('HH:mm')}
//                 </span>
//             </DefaultEventForDayViewTitle>
//             <DefaultEventForDayViewDescription className="event-description">
//                 {title}
//             </DefaultEventForDayViewDescription>
//         </DefaultEventForDayViewContainer>
//     );
// };

export default null;
