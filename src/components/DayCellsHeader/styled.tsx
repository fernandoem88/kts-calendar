import * as React from 'react';
import styled from 'styled-components';

export const DayCellsHeaderStyle = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: ${props =>
        `repeat(${React.Children.count(props.children)}, 1fr)`};
    height: 3.2rem;
    line-height: 3.2rem;
    & > * {
        padding: 0 0.8rem;
    }
`;
