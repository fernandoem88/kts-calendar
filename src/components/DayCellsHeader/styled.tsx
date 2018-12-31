import * as React from 'react';
import styled from 'styled-components';

export const DayCellsHeaderStyle = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: ${props =>
        `repeat(${React.Children.count(props.children)}, 1fr)`};
    height: 3.2rem;
    line-height: 3.2rem;
    border: solid 1px #cccccc;
    border-bottom: none;
    & > * {
        padding: 0 0.4rem;
        text-transform: capitalize;
        &:not(:first-child) {
            border-left: solid 1px #cccccc;
        }
    }
`;
