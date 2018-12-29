import { IWeekHeaderProps } from './interfaces';

export const createGripTemplateColumnsForGridInWeekView = ({
    blocks = 1,
    horizontalZoomLevel = 1,
    horizontalZoomedIndex = -1,
    start,
    end
}: IWeekHeaderProps) => {
    const gridLength = end - start + 1;
    if (horizontalZoomLevel < 0 || horizontalZoomedIndex < 0) {
        return `repeat(${blocks * gridLength}, 1fr)`;
    }

    const leftBlockLength = horizontalZoomedIndex;
    const rightBlocksLength = gridLength - horizontalZoomedIndex - 1;

    const leftBlocks =
        leftBlockLength > 0 ? `repeat(${blocks * leftBlockLength}, 1fr) ` : '';
    const zoomedBlocks = `repeat(${blocks}, ${horizontalZoomLevel}fr)`;
    const rightblocks =
        rightBlocksLength > 0
            ? ` repeat(${rightBlocksLength * blocks}, 1fr)`
            : '';
    return `${leftBlocks}${zoomedBlocks}${rightblocks}`;
};
