import * as React from 'react';
import { DayCellProps } from 'Components/KTSCalendar/interfaces';
import EventsWrapperForMonthView from 'Components/EventsWrapperForMonthView';

const DayCellForMonthView: React.FunctionComponent<DayCellProps> = props => {
    const { renderEvent, renderEventWrapper, ...eventWrapParams } = props;
    const {
        calendarReferenceDate,
        cellEvents,
        navigation,
        view
    } = eventWrapParams;

    const renderEvents = () =>
        cellEvents.map(e =>
            renderEvent({
                calendarReferenceDate,
                event: e,
                cellEvents,
                navigation,
                view
            })
        );

    if (renderEventWrapper) {
        const Wrapper = renderEventWrapper(eventWrapParams);
        return <Wrapper>{renderEvents()}</Wrapper>;
    }
    const DefaultWrapper = EventsWrapperForMonthView(eventWrapParams);
    return <DefaultWrapper>{renderEvents()}</DefaultWrapper>;
};

export default DayCellForMonthView;
