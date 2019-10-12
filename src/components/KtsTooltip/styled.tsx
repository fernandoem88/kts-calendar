import styled, { keyframes } from 'styled-components';
import { CSSProperties } from 'react';

const enterKeyframe = keyframes`
    0% { transform: translateY(-1rem); opacity: 0}
    40% { transform: translateY(-1rem); opacity: 0}
    100% {transform: translateY(0%); opacity: 1}
`;

const getBgColor = (props: { style: CSSProperties }) =>
    props.style && props.style.background
        ? props.style.background
        : 'transparent';

export const KtsTooltipContainer = styled.div`
    animation-timing-function: ease;
    animation-fill-mode: backwards;
    animation: ${enterKeyframe} 500ms;
    padding: 0.4rem;
    &::after {
        content: ' ';
        position: absolute;
        bottom: -0.8rem;
        width: 0;
        height: 0;
        left: 0;
        border-left: 0.8rem solid transparent;
        border-right: 0.8rem solid transparent;
        border-top: 0.8rem solid ${getBgColor}; /*arrow-down*/
    }
`;
