import styled from 'styled-components';

export const AppLayout = styled.div`
    position: relative;
    height: 100vh;
    display: grid;
    grid-template-rows: 4.8rem 1fr;
    grid-template-columns: 25rem 1fr;
    grid-template-areas: 'filter app-header' 'filter calendar';
`;

export const HeaderArea = styled.div`
    grid-area: app-header;
    position: relative;
    display: grid;
    grid-template-columns: 8rem 8rem 1fr;
    text-align: center;
    & > div {
        cursor: pointer;
    }
`;
export const FilterArea = styled.div`
    grid-area: filter;
`;

export const CalendarArea = styled.div`
    grid-area: calendar;
`;
