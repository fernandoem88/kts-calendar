// import * as React from 'react';
// import { Icon } from 'antd';
// import {
//     ToolbarBox,
//     SettingTools,
//     ButtonGroupUserIcon,
//     ButtonGroupDefault,
//     ButtonGroupPrimary,
//     ButtonGroup,
//     NavigationTools,
//     ButtonGroupIcon
// } from './styled';
// import { ICalendarToolbarProps } from './interfaces';
// import { ReactStandarProps } from 'Common/interfaces';

// export default class CalendarToolbar extends React.Component<
//     ICalendarToolbarProps & ReactStandarProps
// > {
//     render() {
//         return (
//             <ToolbarBox className="toolbar-box">
//                 {this.renderNavigationTools()}
//                 {this.renderSettingTools()}
//             </ToolbarBox>
//         );
//     }

//     private onToday = () => {
//         const { onToday } = this.props;
//         if (onToday) {
//             onToday();
//         }
//     };

//     private onNext = () => {
//         const { onNext } = this.props;
//         if (onNext) {
//             onNext();
//         }
//     };

//     private onPrevious = () => {
//         const { onPrevious } = this.props;
//         if (onPrevious) {
//             onPrevious();
//         }
//     };

//     private onNewEvent = () => {
//         const { onNewEvent } = this.props;
//         if (onNewEvent) {
//             onNewEvent();
//         }
//     };

//     private renderNavigationTools = () => {
//         const { title, todayText, newText } = this.props;
//         return (
//             <NavigationTools className="navigation-tools">
//                 <ButtonGroupPrimary
//                     className="clickable nuovo-appuntamento"
//                     onClick={this.onNewEvent}
//                 >
//                     <span>{newText || 'new event'}</span>
//                     <span>
//                         <Icon type="plus" />
//                     </span>
//                 </ButtonGroupPrimary>
//                 <ButtonGroupDefault
//                     className="clickable oggi"
//                     onClick={this.onToday}
//                 >
//                     <span>{todayText || 'today'}</span>
//                 </ButtonGroupDefault>
//                 <ButtonGroupIcon className="indietro">
//                     <span onClick={this.onPrevious}>
//                         <Icon type="left" />
//                     </span>
//                     <span onClick={this.onNext}>
//                         <Icon type="right" />
//                     </span>
//                 </ButtonGroupIcon>
//                 <ButtonGroup className="not-clickable titolo">
//                     <span>{title}</span>
//                 </ButtonGroup>
//             </NavigationTools>
//         );
//     };

//     private renderSettingTools = () => {
//         return (
//             <SettingTools className="setting-tools">
//                 <ButtonGroupIcon>
//                     <span>
//                         <Icon type="search" />
//                     </span>
//                 </ButtonGroupIcon>
//                 <ButtonGroupDefault className="with-separators">
//                     {this.renderViewsSetting()}
//                 </ButtonGroupDefault>
//                 <ButtonGroupIcon>
//                     <span>
//                         <Icon type="setting" />
//                     </span>
//                 </ButtonGroupIcon>
//                 <ButtonGroupUserIcon className="icon-user">
//                     <Icon type="user" />
//                 </ButtonGroupUserIcon>
//             </SettingTools>
//         );
//     };

//     private renderViewsSetting = () => {
//         const { viewsLabels = {}, view, views } = this.props;

//         return views.map(v => (
//             <span
//                 className={view === v ? ' active' : ''}
//                 key={v}
//                 data-view={v}
//                 onClick={this.onView}
//             >
//                 {viewsLabels[v] || v}
//             </span>
//         ));
//     };

//     private onView = (e: any) => {
//         const { view } = e.target.dataset;
//         this.props.onView(view);
//     };
// }

export default null;
