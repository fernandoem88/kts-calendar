import styled from 'styled-components';

export const KTSCalendarContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const CGFMV = styled.div<{ styled: { rows: number } }>``;
export const CalendarGridForMonthView = styled(CGFMV)`
    position: relative;
    display: grid;
    grid-template-rows: repeat(${props => props.styled.rows}, 1fr);
    grid-template-columns: repeat(7, 1fr);
`;
