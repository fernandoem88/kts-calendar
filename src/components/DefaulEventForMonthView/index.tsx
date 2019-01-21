import * as React from 'react';
import {
    DefaultEventMonthViewContainer,
    DotColor,
    DefaultEventDescriptionMonthView
} from './styled';
import { EventData, EventCategory } from 'Components/KTSCalendar/interfaces';
import { KTS_DEFAULT_CATEGORY } from 'Components/KTSCalendar/constants';

export interface DefaultEventForMonthViewProps {
    eventData: EventData;
    onEventClick?: (
        e: React.MouseEvent,
        eventData: EventData,
        eventCategory: EventCategory
    ) => any;
    onDotMouseEnter?: (
        e: React.MouseEvent,
        eventData: EventData,
        eventCategory: EventCategory
    ) => any;
    eventCategories: EventCategory[];
    useDefaultToolTip?: boolean;
}

interface State {
    top: number;
}

class DefaultEventForMonthView extends React.Component<
    DefaultEventForMonthViewProps,
    State
> {
    constructor(props: any) {
        super(props);
        this.state = { top: 0 };
    }
    render() {
        const { eventData, useDefaultToolTip = true } = this.props;
        const { startTime, title } = eventData;
        const eventCategory = this.getEventCategory();
        const hh = this.addZeros('' + startTime.hh);
        const mm = this.addZeros('' + startTime.mm);
        const { color } = eventCategory;

        const withTooltipClass = useDefaultToolTip ? ' with-tool-tip' : '';

        return (
            <DefaultEventMonthViewContainer
                className={withTooltipClass}
                styled={{ title, top: this.state.top }}
                color={color}
                onMouseEnter={this.setMousePosition}
            >
                <DotColor
                    color={color}
                    className={'calendar-dot'}
                    onMouseEnter={this.onDotMouseEnter}
                />
                <DefaultEventDescriptionMonthView
                    color={eventCategory.color}
                    onClick={this.onEventClick}
                >
                    <span className="start-time">{`${hh}:${mm}`}</span>
                    <span className="description">{title}</span>
                </DefaultEventDescriptionMonthView>
            </DefaultEventMonthViewContainer>
        );
    }

    onDotMouseEnter = (e: React.MouseEvent) => {
        const { onDotMouseEnter, eventData } = this.props;
        const eventCategory = this.getEventCategory();
        if (onDotMouseEnter) {
            onDotMouseEnter(e, eventData, eventCategory);
        }
    };
    onEventClick = (e: React.MouseEvent) => {
        const { onEventClick, eventData } = this.props;
        const eventCategory = this.getEventCategory();
        if (onEventClick) {
            onEventClick(e, eventData, eventCategory);
        }
    };

    private addZeros = (t: string) => {
        while (t.length < 2) {
            t = '0' + t;
        }
        return t;
    };

    private getEventCategory = () => {
        const {
            eventCategories,
            eventData: { eventCategoryId }
        } = this.props;
        const eventCategory = eventCategoryId
            ? eventCategories.find(ec => ec.id === eventCategoryId)
            : undefined;
        return eventCategory || KTS_DEFAULT_CATEGORY;
    };

    private setMousePosition = (e: React.MouseEvent<HTMLDivElement>) => {
        const { offsetTop } = e.currentTarget;
        const target: any = e.target;
        const parent = target.parentElement.parentElement.parentElement;
        const scrollTop = parent.scrollTop;
        const top = offsetTop - scrollTop < 32 ? 2.4 : -2.4;
        this.setState({ top });
    };
}

export default DefaultEventForMonthView;
