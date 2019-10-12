import * as React from 'react';
import KTSCalendar from 'Components/KTSCalendar';
import {
    KTSCalendarProps,
    ViewType,
    EventData
} from 'Components/KTSCalendar/interfaces';
import moment from 'moment';
import { AppLayout, HeaderArea, FilterArea, CalendarArea } from './styled';
// import SnapshotSwipper, {
//     SnapshotSwipperProps
// } from 'Components/SnapshotSwipper';

interface CalendarState {
    view: ViewType;
    date: Date;
}
const now = new Date();
export default class AppCalendar extends React.Component<any, CalendarState> {
    events: EventData[] = [
        {
            id: '1',
            startTime: { hh: 10, mm: 30 },
            endTime: { hh: 11, mm: 50 },
            title: 'evento 1',
            date: now
        },
        {
            id: '2',
            startTime: { hh: 10, mm: 45 },
            endTime: { hh: 12, mm: 25 },
            title: 'evento 2 hhshd',
            date: now
        },
        {
            id: '3',
            startTime: { hh: 14, mm: 45 },
            endTime: { hh: 16, mm: 0 },
            title: 'evento 3',
            date: now
        },
        {
            id: '4',
            startTime: { hh: 13, mm: 45 },
            endTime: { hh: 15, mm: 0 },
            title: 'evento 4',
            date: now
        },
        {
            id: '5',
            startTime: { hh: 13, mm: 45 },
            endTime: { hh: 14, mm: 40 },
            title: 'evento 5',
            date: now
        },
        {
            id: '6',
            startTime: { hh: 11, mm: 30 },
            endTime: { hh: 15, mm: 30 },
            title: 'evento 6',
            date: now
        },
        {
            id: '7',
            startTime: { hh: 19, mm: 30 },
            endTime: { hh: 20, mm: 30 },
            title: 'evento 7',
            date: now
        }
    ];
    constructor(props: any) {
        super(props);
        this.state = {
            view: 'month',
            date: now
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
                onDate: this.onDate
            },
            dayStartHour: 8,
            dayEndHour: 20
        };
        // const snapshotSwipperProps: SnapshotSwipperProps<KTSCalendarProps> = {
        //     wrappedElementProps: props,
        //     animation: 'scale-up',
        //     shouldAnimateOnPropsChange: (p1, p2) => p1.view !== p2.view,
        //     duration: 300
        // };
        return (
            <AppLayout>
                <FilterArea>Filter</FilterArea>
                <HeaderArea>
                    <div onClick={this.onPrevious}>previous</div>
                    <div onClick={this.onNext}>next</div>
                    <div
                        style={{
                            display: 'grid',
                            textAlign: 'center',
                            gridTemplateColumns: ' 3fr repeat(4, 1fr)'
                        }}
                    >
                        <div>{date.toLocaleDateString()}</div>
                        <div onClick={() => this.onDate(new Date())}>today</div>
                        {['month', 'week', 'day'].map(this.renderViewButton)}
                    </div>
                </HeaderArea>
                <CalendarArea>
                    {/* <SnapshotSwipper {...snapshotSwipperProps}> */}
                    <KTSCalendar {...props} />
                    {/* </SnapshotSwipper> */}
                </CalendarArea>
            </AppLayout>
        );
    }

    onDate = (d: Date) => {
        console.log('onDate');
        this.setState({ date: d });
    };

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
