import styled from 'styled-components';

export const AppLayout = styled.div`
    position: relative;
    height: 100vh;
    display: grid;
    grid-template-rows: 4.8rem 1fr;
`;

export const AppHeader = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
    & > div {
        cursor: pointer;
    }
`;
