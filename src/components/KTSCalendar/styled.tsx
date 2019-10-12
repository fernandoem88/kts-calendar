import styled from 'styled-components';

export const KTSCalendarLayout = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 4rem 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas: 'grids-header grids-header' 'times-range calendar';
    &[data-view='month'] {
        grid-template-areas: 'grids-header grids-header' 'calendar calendar';
    }
`;

export const KTSCalendarArea = styled.div`
    grid-area: calendar;
    position: relative;
    overflow: auto;
`;

const CGFMV = styled.div<{ styled: { rows: number } }>``;
export const CalendarGridForMonthView = styled(CGFMV)`
    position: relative;
    height: 100%;
    /* border: solid 1px #ccc; */
    display: grid;
    grid-template-rows: repeat(${props => props.styled.rows}, 1fr);
    grid-template-columns: repeat(7, 1fr);
`;

const ATR = styled.div<{
    styled: { totalHours: number };
}>``;

export const AsideTimesRange = styled(ATR)`
    grid-area: times-range;
    position: relative;
    /* border-left: solid 1px #ccc; */
    display: grid;
    grid-template-rows: repeat(${props => props.styled.totalHours}, 1fr);
    & > *:not(:first-child) {
        border-top: solid 1px #cccccc;
    }
`;

export const CalendarHeaderArea = styled.div`
    grid-area: grids-header;
    position: relative;
`;
