import styled from 'styled-components';
import { ViewType } from 'Components/KTSCalendar/interfaces';

interface DayCellColumnProps<V = ViewType> {
    styled: {
        totalHours: number;
        totalFractionsInOneHour: number;
        totalColumns: number;
        view: V;
        gridRowGap?: string;
        gridColumnGap?: string;
    };
}

export const DayCellsContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border-left: solid 1px #cccccc;
    & > * {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
`;
const DCG = styled.div<DayCellColumnProps>``;
export const DayCellGrid = styled(DCG)`
    position: relative;
    display: grid;
    height: 100%;
    grid-template-rows: repeat(
        ${props =>
            props.styled.totalHours * props.styled.totalFractionsInOneHour},
        1fr
    );
    grid-template-columns: repeat(
        ${props => props.styled.totalColumns},
        ${props => (props.styled.view === 'day' ? '25rem' : 'auto')}
    );
    overflow-x: auto;
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
    border-radius: 2px;
    box-shadow: 0 0.2rem 0.2rem #e8e8e8;
`;

export const GridBackgroundRow = styled.div`
    position: relative;
    pointer-events: all;
    &:not(:first-child) {
        border-top: solid 1px #cccccc;
    }
    &:hover {
        background: #8de09f33;
    }
`;
