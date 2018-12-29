import styled from 'styled-components';

export const DefaultEventForDayViewContainer = styled.div`
    position: relative;
    background: ${props => props.color};
    height: 100%;
    overflow: auto;
    font-size: 1.2rem;
`;

export const DefaultEventForDayViewTitle = styled.div`
    padding: 0.4rem;
    height: 2.4rem;
    & > span {
        margin-right: 0.4rem;
        &.value {
            font-weight: 600;
        }
    }
`;

export const DefaultEventForDayViewDescription = styled.div`
    padding: 0.4rem;
`;
