import * as React from 'react';
import styled from 'styled-components';

export const CalendarHeaderContainer = styled.div`
    position: relative;
    display: grid;
    height: 4.2rem;
    line-height: 4.2rem;
    border-bottom: solid 1px #cccccc;
    background: #bcd6e6;
    grid-template-columns: ${props =>
        `repeat(${React.Children.count(props.children)}, 1fr)`};
    &[data-view='week'] {
        grid-template-columns: 4rem repeat(7, 1fr);
    }
    & > * {
        padding: 0 0.4rem;
        text-transform: capitalize;
        &:not(:first-child) {
            border-left: solid 1px #999999;
        }
    }
`;
