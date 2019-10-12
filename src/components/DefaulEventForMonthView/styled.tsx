import styled, { keyframes } from 'styled-components';
import { COLORS } from 'Common/css-constants';

const enterKeyframe = keyframes`
    0% { transform: translateY(-1rem); opacity: 0}
    20% { transform: translateY(-.5rem); opacity: .6}
    100% {transform: translateY(0%); opacity: 1}
`;

const defaultHeight = 1.8;

const DEMV = styled.div<{ styled: { title: any; top?: number } }>``;
export const DefaultEventMonthViewContainer = styled(DEMV)`
    position: relative;
    width: 100%;
    margin-top: 0.4rem;
    display: grid;
    grid-template-columns: ${defaultHeight}rem 1fr;
    grid-gap: 0.2rem;
    &::before,
    &::after {
        animation-timing-function: ease;
        animation-fill-mode: backwards;
        animation: ${enterKeyframe} 200ms;
        z-index: 100000;
    }

    &.with-tool-tip:hover {
        &::before {
            content: ${props => {
                return `"${props.styled.title}"`;
            }};
            position: absolute;
            background: ${props => props.color};
            /* width: 10rem; */
            /* height: 2.4rem; */
            padding: 0.2rem;
            line-height: 2rem;
            color: ${COLORS.$cc_white};
            font-size: 1.2rem;
            left: 0.2rem;
            border-radius: 3px;
            ${props => {
                const { top = -2.4 } = props.styled;
                if (top < 0) {
                    return `
                        bottom: ${4.6 + top}rem;
                        border-bottom-left-radius: 0px;
                        box-shadow: 0 3px 3px #0009;
                    `;
                } else {
                    return `
                        top: ${top}rem;
                        border-top-left-radius: 0px;
                        box-shadow: 0 -1px 3px #0009;
                    `;
                }
            }};
        }

        &::after {
            content: '.';
            color: transparent;
            position: absolute;
            width: 0;
            height: 0;
            left: 0.2rem;
            ${props => {
                const { top = -2.4 } = props.styled;
                if (top < 0) {
                    return `
                        top: -0.4rem;
                        border-left: 0.8rem solid transparent;
                        border-right: 0.8rem solid transparent;
                        border-top: 0.8rem solid ${props.color};
                    `;
                } else {
                    return `
                        top: 1.6rem;
                        border-left: 0.8rem solid transparent;
                        border-right: 0.8rem solid transparent;
                        border-bottom: 0.8rem solid ${props.color};
                    `;
                }
            }}
        }
    }
`;
const DC = styled.span<{ color?: string }>``;
export const DotColor = styled(DC)`
    position: relative;
    height: ${defaultHeight}rem;
    &::after {
        content: ' ';
        transition: 0.2s;
        position: absolute;
        height: 0.6rem;
        width: 0.6rem;
        border-radius: 50%;
        ${props => (props.color ? `background: ${props.color}` : '')};
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        ${DefaultEventMonthViewContainer}:hover & {
            height: 0.9rem;
            width: 0.9rem;
        }
    }
`;

export const DefaultEventDescriptionMonthView = styled.div`
    transition: 0.5s;
    position: relative;
    height: ${defaultHeight}rem;
    line-height: ${defaultHeight - 0.7}rem;
    white-space: nowrap;
    overflow: hidden;
    & span {
        font-size: ${defaultHeight - 0.4}rem;
        height: ${defaultHeight - 0.4}rem;
        display: inline-block;
    }

    & .description {
        font-weight: 600;
        margin-left: 0.6rem;
        cursor: default;
        text-overflow: ellipsis;
        max-width: 70%;
        overflow: hidden;
        vertical-align: middle;
    }
    &:hover {
        & .description {
            text-decoration: underline;
        }
    }
`;
