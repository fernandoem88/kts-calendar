import * as React from 'react';
import styled from 'styled-components';

export const CalendarHeaderStyle = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: ${props =>
        `repeat(${React.Children.count(props.children)}, 1fr)`};

    &[data-view='week'] {
        grid-template-columns: 4rem repeat(7, 1fr);
    }

    height: 100%;
    vertical-align: middle;
    & > * {
        padding: 0 0.4rem;
        text-transform: capitalize;
        &:not(:first-child) {
            border-left: solid 1px #cccccc;
        }
    }
`;
