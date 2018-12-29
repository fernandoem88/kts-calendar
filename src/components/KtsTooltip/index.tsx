import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IKtsTooltipProps } from './interfaces';
import { KtsTooltipContainer } from './styled';

const createTooltip = (props: IKtsTooltipProps) => {
    const body = document.querySelector('body');
    if (body) {
        const bodyRect = body.getBoundingClientRect();

        const {
            component,
            event: { currentTarget },
            noCarret = false,
            style = {}
        } = props;

        const carretGap = noCarret ? 0 : 12;
        const rect = currentTarget.getBoundingClientRect();

        const position: React.CSSProperties = {
            left: rect.left,
            bottom: bodyRect.height - rect.top + carretGap,
            position: 'fixed'
        };

        const tooltip = (
            <KtsTooltipContainer style={{ ...style, ...position }}>
                {component}
            </KtsTooltipContainer>
        );
        const tooltipContainer = document.createElement('div');
        // tooltipContainer.id = uniq('tooltip-');
        tooltipContainer.style.position = 'absolute';
        tooltipContainer.style.left = '0';
        tooltipContainer.style.top = '0';
        tooltipContainer.style.width = '0';
        tooltipContainer.style.height = '0';
        tooltipContainer.style.pointerEvents = 'none';
        const container = body.appendChild(tooltipContainer);
        ReactDOM.render(tooltip, container);
        return {
            destroy: () => {
                body.removeChild(tooltipContainer);
            }
        };
    }
    return null;
};

export default class KtsTooltip {
    constructor(private props: IKtsTooltipProps) {}
    create = () => createTooltip(this.props);
}
