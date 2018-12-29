import { CSSProperties } from 'react';

export interface IKtsTooltipProps {
    component: string | JSX.Element;
    style?: CSSProperties;
    event: React.MouseEvent<HTMLDivElement>;
    arrowPosition?: 'left' | 'center' | 'right';
    gap?: number;
    noCarret?: boolean;
}
