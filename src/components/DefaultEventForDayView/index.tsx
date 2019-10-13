import * as React from 'react';
import moment from 'moment';
import {
    DayViewDefaultEventContainer,
    DayViewDefaultEventTitle,
    DayViewDefaultEventDescription
} from './styled';
import {
    RFC,
    EventProps,
    DayCellClasses
} from 'Components/KTSCalendar/interfaces';

const now = new Date();

const DayViewDefaultEvent: RFC<EventProps> = ({
    event,
    eventCategories = [],
    view
}) => {
    const { eventCategoryId, title, endTime, startTime } = event;
    const eventCategory = eventCategories.find(ec => ec.id === eventCategoryId);
    const categoryColor = eventCategory ? eventCategory.color : '#b6d6e8';
    const eventStartMoment = moment(event.date).set({
        hours: startTime.hh,
        minutes: startTime.mm
    });
    const eventEndMoment = moment(event.date).set({
        hours: endTime.hh,
        minutes: endTime.mm
    });
    const pastEvent = moment(event.date).isBefore(now, 'day')
        ? DayCellClasses.PAST_EVENT_CELL
        : '';

    return (
        <DayViewDefaultEventContainer
            color={categoryColor}
            data-view={view}
            className={pastEvent}
        >
            <DayViewDefaultEventTitle className="eventTitle">
                <span className="from title">From</span>
                <span className="from value">
                    {eventStartMoment.format('HH:mm')}
                </span>
                <span className="to title">To</span>
                <span className="to value">
                    {eventEndMoment.format('HH:mm')}
                </span>
            </DayViewDefaultEventTitle>
            <DayViewDefaultEventDescription className="event-description">
                {title}
            </DayViewDefaultEventDescription>
        </DayViewDefaultEventContainer>
    );
};

export default DayViewDefaultEvent;
