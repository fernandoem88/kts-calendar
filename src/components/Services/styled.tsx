import styled from 'styled-components';

export const ServicesContainer = styled.div`
    position: relative;
`;

export const ServicesHeader = styled.div`
    height: 4.2rem;
    line-height: 4.2rem;
    font-size: 1.4rem;
    text-transform: CAPITALIZE;
    font-weight: 600;
`;

export const ServiceItemsList = styled.div`
    padding-bottom: 1.2rem;
    max-height: 34rem;
    overflow-y: auto;
`;

export const ServiceItem = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 1.8rem;
    & .ant-checkbox-checked .ant-checkbox-inner {
        background-color: ${props => props.color};
        border-color: ${props => props.color};
    }
    & .service-name {
        font-size: 1.2rem;
        font-weight: 600;
        line-height: 2.4rem;
    }
    margin-top: 0.3rem;
`;

export const ServiceItemContent = styled.div`
    &.unselected-service {
        text-decoration: line-through;
    }
`;
