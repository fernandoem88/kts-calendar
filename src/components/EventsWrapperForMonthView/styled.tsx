import styled from 'styled-components';

export const EventsWrapperStyleForMonthView = styled.div`
    position: relative;
    display: grid;
    grid-template-rows: 1.8rem 1fr;
`;

export const CellHeader = styled.div`
    height: 2.4rem;
    line-height: 2.4rem;
    padding: 0 0.8rem;
`;

export const EventsListForMonthView = styled.div`
    position: relative;
    overflow: auto;
`;
