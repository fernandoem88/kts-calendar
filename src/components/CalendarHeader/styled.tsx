import * as React from 'react';
import styled from 'styled-components';
import { COLORS } from 'Common/css-constants';

export const CalendarHeaderContainer = styled.div`
    position: relative;
    display: grid;
    height: 4.2rem;
    line-height: 4.2rem;
    border-bottom: solid 1px ${COLORS.$cc_grey_ccc};
    background: ${COLORS.$cc_light_blue_dark};
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
