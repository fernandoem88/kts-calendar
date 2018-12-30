import * as React from 'react';
import KTSCalendar from 'Components/KTSCalendar';
import { KTSCalendarProps } from 'Components/KTSCalendar/interfaces';

export default class AppCalendar extends React.Component {
    render() {
        const props: KTSCalendarProps = {
            weekStartAt: 'monday',
            events: [],
            view: 'month',
            date: new Date()
        };
        return (
            <div>
                <KTSCalendar {...props} />
            </div>
        );
    }
}
