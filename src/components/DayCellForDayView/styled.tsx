import styled from 'styled-components';
import { ViewType } from 'Components/KTSCalendar/interfaces';

interface DayCellColumnProps<V = ViewType> {
    styled: {
        totalHours: number;
        totalBlocksInOneHour: number;
        totalColumns: number;
        view: V;
        gridRowGap?: string;
        gridColumnGap?: string;
    };
}

export const DayCellWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border-left: solid 1px #cccccc;
    display: grid;
    grid-template-columns: 1fr;
    overflow: auto;
    &.today-cell {
        background: #edf8ff;
    }
`;
const DCG = styled.div<DayCellColumnProps>``;
export const DayCellGrid = styled(DCG)`
    position: absolute;
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-rows: repeat(
        ${props => props.styled.totalHours * props.styled.totalBlocksInOneHour},
        1fr
    );
    grid-template-columns:
        repeat(${({ styled: st }) => st.totalColumns}, auto)
        1fr;
    grid-row-gap: ${props => props.styled.gridRowGap || 0};
    grid-column-gap: ${props => props.styled.gridColumnGap || 0};
`;

const GRBG = styled.div<{ styled: { dataNowMinutes?: number } }>``;
export const GridRowBackGround = styled(GRBG)`
    pointer-events: all;
    position: relative;
    border-top: solid 1px #cccccc;
`;

const GRFFDV = styled.div<{
    styled: {
        columnIndex: number;
        rowIndex: number;
        totalRowsFractions: number;
    };
}>``;
export const GridRowFractionForDayView = styled(GRFFDV)`
    pointer-events: all;
    grid-column: ${props => props.styled.columnIndex + 1};
    grid-row: ${({ styled: { rowIndex, totalRowsFractions } }) => {
        return `${rowIndex + 1}/${rowIndex + totalRowsFractions + 1}`;
    }};
    padding: 2px;
`;

export const GridBackgroundRow = styled.div`
    position: relative;
    pointer-events: all;
    &:not(:first-child) {
        border-top: solid 1px #cccccc;
    }
    &:hover {
        background: #edf8ff;
    }
`;
