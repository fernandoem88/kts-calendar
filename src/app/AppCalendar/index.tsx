import * as React from 'react';
import KTSCalendar from 'Components/KTSCalendar';
import {
    KTSCalendarProps,
    ViewType,
    EventData
} from 'Components/KTSCalendar/interfaces';
import moment from 'moment';
import {
    AppLayout,
    HeaderArea,
    // FilterArea,
    CalendarArea,
    NavBtn
} from './styled';
// import SnapshotSwipper, {
//     SnapshotSwipperProps
// } from 'Components/SnapshotSwipper';

interface CalendarState {
    view: ViewType;
    date: Date;
}
const now = new Date();
const DAY_MS = 24 * 60 * 60 * 1000;
const yesterday = new Date(now.getTime() - DAY_MS);
const tomorrow = new Date(now.getTime() + DAY_MS);
export default class AppCalendar extends React.Component<any, CalendarState> {
    events: EventData[] = [
        {
            id: 'tomorrow',
            startTime: { hh: 13, mm: 30 },
            endTime: { hh: 15, mm: 50 },
            title: 'tomorrow event',
            date: tomorrow
        },
        {
            id: 'yesterday-1',
            startTime: { hh: 9, mm: 30 },
            endTime: { hh: 13, mm: 20 },
            title: 'yesterday event 1',
            date: yesterday
        },
        {
            id: 'yesterday-2',
            startTime: { hh: 12, mm: 30 },
            endTime: { hh: 14, mm: 50 },
            title: 'yesterday event 2',
            date: yesterday
        },
        {
            id: '1',
            startTime: { hh: 10, mm: 30 },
            endTime: { hh: 11, mm: 50 },
            title: 'event 1',
            date: now
        },
        {
            id: '2',
            startTime: { hh: 10, mm: 45 },
            endTime: { hh: 12, mm: 25 },
            title: 'event 2',
            date: now
        },
        {
            id: '6',
            startTime: { hh: 14, mm: 45 },
            endTime: { hh: 16, mm: 0 },
            title: 'event 6',
            date: now
        },
        {
            id: 'long event label',
            startTime: { hh: 13, mm: 45 },
            endTime: { hh: 15, mm: 0 },
            title: 'long event label',
            date: now
        },
        {
            id: '4',
            startTime: { hh: 13, mm: 45 },
            endTime: { hh: 14, mm: 40 },
            title: 'event 4',
            date: now
        },
        {
            id: '3',
            startTime: { hh: 11, mm: 30 },
            endTime: { hh: 15, mm: 30 },
            title: 'event 3',
            date: now
        },
        {
            id: '7',
            startTime: { hh: 19, mm: 30 },
            endTime: { hh: 20, mm: 30 },
            title: 'event 7',
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
                {/* <FilterArea>Filters</FilterArea> */}
                <HeaderArea>
                    <NavBtn>
                        <div onClick={this.onPrevious}>previous</div>
                    </NavBtn>
                    <NavBtn onClick={() => this.onDate(new Date())}>
                        <div>Today</div>
                    </NavBtn>
                    <NavBtn>
                        <div onClick={this.onNext}>next</div>
                    </NavBtn>
                    <NavBtn>{date.toLocaleDateString()}</NavBtn>
                    {['month', 'week', 'day'].map(this.renderViewButton)}
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
        this.setState({ date: d });
    };

    renderViewButton = (view: ViewType, index: number) => (
        <NavBtn key={index} onClick={() => this.onViewChange(view)}>
            <div className={this.state.view === view ? 'selected' : ''}>
                {view}
            </div>
        </NavBtn>
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
