import * as React from 'react';
import { SnapshotSwipperContainer, SnapshotSwipperCard } from './styled';

type IBoth<P> = {
    current: P;
    next: P;
};

interface IState<P = {}> {
    snapshotsState: IBoth<P> | null;
}
type SnapshotSwipperAnimations =
    | 'swip-to-left'
    | 'swip-to-right'
    | 'scale-up'
    | 'rotate-center'
    | 'rotate-bottom-left';
type SnapshotSwipperAnimationsCreator<P = {}, T = string> = (
    currentProps: P,
    nextProps: P
) => SnapshotSwipperAnimations | T;

export type SnapshotSwipperProps<P = {}> = {
    animation: SnapshotSwipperAnimations | SnapshotSwipperAnimationsCreator<P>;
    duration?: number;
    shouldAnimateOnPropsChange?: (currentProps: P, nextProps: P) => boolean;
    onAnimationStart?: (timestamp: number) => any;
    onAnimationEnd?: (timestamp: number) => any;
    wrappedElementProps: P;
};
type IProps = SnapshotSwipperProps;

const DEFAULT_DURATION = 2000;

export default class SnapshotSwipper extends React.Component<IProps, IState> {
    private timeout: NodeJS.Timeout | null;
    private mounted = false;
    constructor(props: IProps) {
        super(props);
        this.state = {
            snapshotsState: null
        };
    }
    componentWillMount() {
        this.mounted = true;
    }
    componentWillUnmount() {
        this.mounted = false;
    }

    componentWillReceiveProps(nextProps: IProps) {
        const { wrappedElementProps: next } = nextProps;
        const { wrappedElementProps: current } = this.props;

        this.setSnapshotsState(current, next);
    }

    getAnimationName = () => {
        const { snapshotsState } = this.state;
        if (!snapshotsState) {
            return '';
        }
        const { animation } = this.props;
        if (typeof animation === 'string') {
            return animation;
        }
        const { next, current } = snapshotsState;

        return animation(next, current);
    };

    setSnapshotsState = (current: {}, next: {}) => {
        const { shouldAnimateOnPropsChange } = this.props;

        if (
            !shouldAnimateOnPropsChange ||
            !shouldAnimateOnPropsChange(current, next)
        ) {
            return;
        }
        const snapshotsState = {
            current,
            next
        };
        // this setState will fire the animation
        this.setState({ snapshotsState }, () => this.onAnimationStart());
    };

    onAnimationStart = () => {
        const timestamp = new Date().getTime();
        const {
            duration = DEFAULT_DURATION,
            onAnimationEnd,
            onAnimationStart
        } = this.props;
        if (onAnimationStart) {
            onAnimationStart(timestamp);
        }
        this.timeout = setTimeout(() => {
            if (!this.mounted) {
                return;
            }
            this.deleteSnapshotsState();
            if (onAnimationEnd) {
                onAnimationEnd(timestamp);
            }
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.timeout = null;
        }, duration) as any;
    };

    render() {
        const { snapshotsState } = this.state;
        return (
            <SnapshotSwipperContainer>
                {snapshotsState
                    ? this.renderBothSnapshots()
                    : this.renderCurrentSnapshot()}
            </SnapshotSwipperContainer>
        );
    }

    renderClonedChild: React.StatelessComponent<{
        type: string;
    }> = childProps => {
        const { children, duration = DEFAULT_DURATION } = this.props;
        if (!children) {
            return null;
        }
        const animationName = this.getAnimationName();
        const { type, ...p } = childProps;
        const classes = ['wrapped-element', animationName, type];
        const element = React.Children.only(children);
        const child = React.cloneElement(element, p);
        return (
            <SnapshotSwipperCard
                className={classes.join(' ')}
                duration={duration}
            >
                {child}
            </SnapshotSwipperCard>
        );
    };

    renderBothSnapshots = () => {
        const { snapshotsState } = this.state;

        if (!snapshotsState) {
            return null;
        }
        const Child = this.renderClonedChild;
        const { next, current } = snapshotsState;
        const propsArray = [
            { key: 'current', props: current },
            { key: 'next', props: next }
        ];
        return propsArray.map(({ key, props }) => (
            <Child key={key} type={key} {...props} />
        ));
    };

    renderCurrentSnapshot = () => {
        const { snapshotsState } = this.state;

        if (snapshotsState) {
            return null;
        }
        const Child = this.renderClonedChild;
        const { wrappedElementProps: current } = this.props;

        return <Child key={'current'} type="current" {...current} />;
    };

    deleteSnapshotsState = () => {
        const { snapshotsState } = this.state;
        return snapshotsState && this.setState({ snapshotsState: null });
    };
}
