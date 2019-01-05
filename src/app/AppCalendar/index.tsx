import * as React from 'react';
import KTSCalendar from 'Components/KTSCalendar';
import {
    KTSCalendarProps,
    ViewType,
    EventData
} from 'Components/KTSCalendar/interfaces';
import moment from 'moment';
import { AppLayout, HeaderArea, FilterArea, CalendarArea } from './styled';

interface CalendarState {
    view: ViewType;
    date: Date;
}
export default class AppCalendar extends React.Component<any, CalendarState> {
    events: EventData[] = [
        {
            id: '1',
            startTime: { hh: 10, mm: 30 },
            endTime: { hh: 11, mm: 50 },
            title: 'propva_sdf_gdffg',
            date: new Date('2019/01/04')
        },
        {
            id: '2',
            startTime: { hh: 10, mm: 45 },
            endTime: { hh: 12, mm: 25 },
            title: 'propva_2_gkmn hhshd',
            date: new Date('2019/01/04')
        },
        {
            id: '3',
            startTime: { hh: 10, mm: 45 },
            endTime: { hh: 12, mm: 25 },
            title: 'propva_3_plusdrg',
            date: new Date('2018/12/31')
        }
    ];
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
            weekStartFrom: 'sunday',
            events: this.events,
            view,
            date,
            navigation: {
                onView: this.onViewChange,
                onDate: d => this.setState({ date: d })
            }
        };
        return (
            <AppLayout>
                <FilterArea>Filter</FilterArea>
                <HeaderArea>
                    <div onClick={this.onPrevious}>previous</div>
                    <div onClick={this.onNext}>next</div>
                    <div style={buttonsStyle}>
                        <div>{date.toLocaleDateString()}</div>
                        {['month', 'week', 'day'].map(this.renderViewButton)}
                    </div>
                </HeaderArea>
                <CalendarArea>
                    <KTSCalendar {...props} />
                </CalendarArea>
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
