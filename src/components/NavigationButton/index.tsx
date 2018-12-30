import * as React from 'react';
import moment from 'moment';
import { ViewType } from 'Components/KTSCalendar/interfaces';

interface INavigationButtonProps {
    onDate: (date: Date) => any;
    type: 'next' | 'previous';
    view: ViewType;
    calendarReferenceDate: Date;
    component?: (p: any) => JSX.Element;
}
export default (props: INavigationButtonProps) => {
    const { component, type } = props;
    const C = component;
    return C ? (
        <C onClick={() => navigate(props)} />
    ) : (
        <span onClick={() => navigate(props)}>{type}</span>
    );
};
const navigate = ({
    calendarReferenceDate,
    type,
    view,
    onDate
}: INavigationButtonProps) => {
    if (view === 'agenda') {
        console.error({ message: 'can not navigate with the "agenda" view' });
        return;
    }
    const crd = moment(calendarReferenceDate);

    const step = type === 'next' ? 1 : -1;
    const date =
        step > 0
            ? crd.add({ [view + 's']: 1 })
            : crd.subtract({ [view + 's']: 1 });
    onDate(date.toDate());
};
