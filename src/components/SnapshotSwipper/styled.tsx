import styled, { keyframes } from 'styled-components';

const linearSwip = (
    start: string,
    end: string,
    entering: boolean = true
) => keyframes`
    from {transform: translateX(${start}); opacity: ${entering ? 0 : 1}}
    to {transform: translateX(${end}); opacity: ${entering ? 1 : 0}}
`;

const rotateBottomLeft = keyframes`
    from {transform: translateX(0rem) rotate(3deg) scale(.95); opacity: 0}
    to {transform: translateX(0rem) rotate(0deg) scale(1); opacity: 1}
`;

const rotateCenterIn = keyframes`
    0% {transform: rotate(-360deg) scale(1); opacity: 0}
    45% {transform: rotate(0deg) scale(.5); opacity: 1}
    100% {transform: rotate(360deg) scale(1); opacity: 1}
`;
const rotateCenterOut = keyframes`
    0% {transform: rotate(0deg) scale(1); opacity: 1}
    50% {transform: rotate(360deg) scale(.5); opacity: 0}
    100% {transform: rotate(360deg) scale(0); opacity: 0}
`;

const scaleUpIn = keyframes`
    0% {transform: scale(.98); opacity: 0}
    40% {transform: scale(.98); opacity: 0}
    100% {transform: scale(1); opacity: 1}
`;
const scaleUpOut = keyframes`
    0% {transform: scale(1); opacity: 1}
    40% {transform: scale(.98); opacity: 0.5}
    50% {transform: scale(.98); opacity: 0}
    100% {transform: scale(.98); opacity: 0}
`;

export const SnapshotSwipperContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const SWC = styled.div<{ duration: number }>``;
export const SnapshotSwipperCard = styled(SWC)`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    &.current {
        z-index: 0;
    }
    &.next {
        z-index: 2;
    }
    &.swip-to-left {
        &.next {
            animation: ${linearSwip('100%', '0%')} ${props => props.duration}ms
                both ease-in-out;
        }
        &.current {
            animation: ${linearSwip('0%', '-100%', false)}
                ${props => props.duration}ms both ease-in-out;
        }
    }
    &.swip-to-right {
        &.next {
            animation: ${linearSwip('-100%', '0%')} ${props => props.duration}ms
                both ease-in-out;
        }
        &.current {
            animation: ${linearSwip('0%', '100%', false)}
                ${props => props.duration}ms both ease-in-out;
        }
    }
    &.rotate-bottom-left {
        &.next {
            animation: ${rotateBottomLeft} ${props => props.duration}ms both
                ease-in;
            transform-origin: 0% 100%;
        }
        &.current {
            display: none;
        }
    }

    &.rotate-center {
        &.next {
            animation: ${rotateCenterIn} ${props => props.duration}ms both
                ease-in;
        }
        &.current {
            animation: ${rotateCenterOut} ${props => props.duration}ms both
                ease-out;
        }
    }

    &.scale-up {
        &.next {
            animation: ${scaleUpIn} ${props => props.duration}ms both ease-in;
        }
        &.current {
            animation: ${scaleUpOut} ${props => props.duration}ms both ease-out;
        }
    }
`;
