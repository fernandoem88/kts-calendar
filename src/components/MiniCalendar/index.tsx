// import * as React from 'react';
// import EasyCalendar from 'Components/EasyCalendar';
// import { IEasyCalendarProps } from 'Components/EasyCalendar/interfaces';
// import DefaultDayCell from 'Components/DefaultDayCell';
// import {
//     MiniCalendarContainer,
//     MiniCalendarGridHeader,
//     minicalendarDayCellCSSForMonthView,
//     MiniCalendarTools,
//     MiniCalendarArrows,
//     MiniCalendarToolsTitle
// } from './styled';
// import { IDayCellProps } from 'Components/DefaultDayCell/interfaces';
// import { GridHeaderForMonthView } from 'Components/EasyCalendar/styled';
// import { moment } from 'Common/utils';
// import NavigationButton from 'Components/NavigationButton';
// import { IMiniCalnedarProps } from './interfaces';

// const dateFormat = 'YYYY/MM/DD';
// class MiniCalendar extends React.Component<
//     IMiniCalnedarProps,
//     { selectedDate: Date; referenceDate: Date }
// > {
//     constructor(props: any) {
//         super(props);
//         const now = new Date();
//         this.state = {
//             selectedDate: now,
//             referenceDate: now
//         };
//     }
//     componentWillReceiveProps = ({ referenceDate }: IMiniCalnedarProps) => {
//         if (
//             referenceDate &&
//             moment(referenceDate).format(dateFormat) !==
//                 moment(this.state.selectedDate).format(dateFormat)
//         ) {
//             this.setState({ selectedDate: referenceDate, referenceDate });
//         }
//     };

//     render() {
//         const { daysNames, monthsNames } = this.props;
//         const easyCalendarProps: IEasyCalendarProps = {
//             components: {
//                 renderDayCell: this.renderDayCell,
//                 renderGridHeader: this.renderGridHeader
//             },
//             events: [],
//             date: this.state.referenceDate,
//             view: 'month',
//             navigation: {
//                 onDate: this.onDateSeletion, // this.props.changeCalendarReferenceDate,
//                 onView: this.onView
//             },
//             daysNames,
//             monthsNames
//         };
//         return (
//             <MiniCalendarContainer className="mini-calendar">
//                 {this.renderNavigationTools()}
//                 <EasyCalendar {...easyCalendarProps} />
//             </MiniCalendarContainer>
//         );
//     }
//     private onDateSeletion = (date: Date) => {
//         const { onDateSelection } = this.props;
//         const d = moment(date)
//             .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
//             .toDate();
//         this.setState(
//             {
//                 selectedDate: d
//             },
//             () => {
//                 if (onDateSelection) {
//                     onDateSelection(d);
//                 }
//             }
//         );
//     };
//     private onNext = (d: Date) => {
//         console.log('onNext');
//         const { onNext, referenceDate } = this.props;
//         if (!referenceDate) {
//             return;
//         }

//         this.setState({ referenceDate: d }, () => {
//             if (onNext) {
//                 onNext(d);
//             }
//         });
//     };
//     private onPrevious = (d: Date) => {
//         console.log('onPrevious');
//         const { onPrevious, referenceDate } = this.props;
//         if (!referenceDate) {
//             return;
//         }

//         this.setState({ referenceDate: d }, () => {
//             if (onPrevious) {
//                 onPrevious(d);
//             }
//         });
//     };
//     private onView = () => null;
//     private renderDayCell = ({ clickableHeader, ...props }: IDayCellProps) => {
//         const p = { ...props, noDefaultCSS: true, clickableHeader: true };
//         return (
//             <DefaultDayCell
//                 {...p}
//                 key={`${p.dayIndex}_${p.weekIndex}`}
//                 cssProps={minicalendarDayCellCSSForMonthView}
//             />
//         );
//     };
//     private renderGridHeader = (props: IEasyCalendarProps) => {
//         const { daysNames } = props;
//         return daysNames ? (
//             <GridHeaderForMonthView
//                 className="month-view-header"
//                 key="calendar-grids-header"
//             >
//                 {daysNames.map(d => (
//                     <MiniCalendarGridHeader key={d}>
//                         {d.substr(0, 1)}
//                     </MiniCalendarGridHeader>
//                 ))}
//             </GridHeaderForMonthView>
//         ) : null;
//     };
//     private renderNavigationTools = () => {
//         const { monthsNames } = this.props;
//         const { selectedDate } = this.state;

//         const date = moment(selectedDate);
//         const title = monthsNames ? monthsNames[date.month()] : date.month();
//         return (
//             <MiniCalendarTools>
//                 <MiniCalendarToolsTitle>
//                     <span>{title}</span>&nbsp;<span>{date.year()}</span>
//                 </MiniCalendarToolsTitle>
//                 <MiniCalendarArrows className="arrows">
//                     <NavigationButton
//                         calendarReferenceDate={selectedDate}
//                         type="previous"
//                         onDate={this.onPrevious}
//                         view="month"
//                     />
//                     <NavigationButton
//                         calendarReferenceDate={selectedDate}
//                         type="next"
//                         onDate={this.onNext}
//                         view="month"
//                     />
//                 </MiniCalendarArrows>
//             </MiniCalendarTools>
//         );
//     };
// }

// export default MiniCalendar;
