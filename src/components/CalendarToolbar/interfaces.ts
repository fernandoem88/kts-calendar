import { ViewType } from 'Components/KTSCalendar/interfaces';

export interface ViewsLabels {
    agenda?: string;
    day?: string;
    month?: string;
    week?: string;
}

export interface KTSCalendarToolbarProps {
    // navigate: (step: number) => void;
    onView: (view: ViewType) => void;
    view: ViewType;
    views: ViewType[];
    dateFormat: string;
    title: any;
    newText?: any;
    todayText?: any;
    viewsLabels?: ViewsLabels;
    onNext?: () => void;
    onPrevious?: () => void;
    onToday?: () => void;
    onNewEvent?: () => void;
}
