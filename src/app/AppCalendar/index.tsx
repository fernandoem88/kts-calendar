import * as React from 'react';
import KTSCalendar from 'Components/KTSCalendar';
import { KTSCalendarProps, ViewType } from 'Components/KTSCalendar/interfaces';
import moment from 'moment';
import { AppLayout, AppHeader } from './styled';
interface CalendarState {
    view: ViewType;
    date: Date;
}
export default class AppCalendar extends React.Component<any, CalendarState> {
    constructor(props: any) {
        super(props);
        this.state = {
            view: 'month',
            date: new Date()
        };
    }
    render() {
        const { date, view } = this.state;
        const props: KTSCalendarProps = {
            weekStartAt: 'monday',
            events: [],
            view,
            date
        };
        return (
            <AppLayout>
                <AppHeader>
                    <div onClick={this.onPrevious}>previous</div>
                    <div style={buttonsStyle}>
                        <div>{date.toLocaleDateString()}</div>
                        {['month', 'week', 'day'].map(this.renderViewButton)}
                    </div>
                    <div onClick={this.onNext}>next</div>
                </AppHeader>
                <KTSCalendar {...props} />
            </AppLayout>
        );
    }

    renderViewButton = (view: ViewType) => (
        <div key={view} onClick={() => this.onViewChange(view)}>
            {view}
        </div>
    );

    onViewChange = (view: ViewType) => this.setState({ view });

    navigate = (type: 'next' | 'previous') => {
        const { date, view } = this.state;
        const mmt = moment(date);
        if (view === 'agenda') {
            return;
        }
        if (type === 'next') {
            mmt.add({ [view + 's']: 1 });
        } else {
            mmt.subtract({ [view + 's']: 1 });
        }
        this.setState({ date: mmt.toDate() });
    };

    onNext = () => this.navigate('next');
    onPrevious = () => this.navigate('previous');
}

const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    textAlign: 'center'
};

const buttonsStyle: React.CSSProperties = {
    ...containerStyle,
    gridTemplateColumns: ' 3fr repeat(3, 1fr)'
};
