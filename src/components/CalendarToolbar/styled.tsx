import styled from 'styled-components';

const HEADER_HEIGHT = 6.4;

export const ToolbarBox = styled.div`
    position: relative;
    height: ${HEADER_HEIGHT}rem;
    line-height: 3.2rem;
    display: grid;
    grid-template-columns: 1fr auto;
`;

export const Tools = styled.div`
    position: relative;
    height: ${HEADER_HEIGHT}rem;
    padding: ${HEADER_HEIGHT / 4}rem;
`;

export const SettingTools = styled(Tools)`
    display: grid;
    grid-template-columns: 6rem auto auto 6rem;

    & > :nth-child(3) {
        margin-left: 6.4rem;
        @media screen and (max-width: 948px) {
            margin-left: 0;
        }
    }
    @media screen and (max-width: 1099px) {
        padding-left: 0;
    }
    @media screen and (max-width: 948px) {
        grid-template-columns: 3.2rem auto 3.2rem 3.2rem;
    }
`;

export const NavigationTools = styled(Tools)`
    padding-left: 0.4rem;
    & > .nuovo-appuntamento {
        margin-right: 2.4rem;
        @media screen and (max-width: 1199px) {
            & span:first-child {
                display: none;
            }
        }
    }
    & > .oggi {
        margin-right: 1.8rem;
    }
    & > .titolo {
        margin-left: 1.2rem;
        text-transform: capitalize;
        letter-spacing: 1px;
    }

    @media screen and (max-width: 1099px) {
        padding-left: 0;
        padding-right: 0;
        & > .oggi,
        & > .nuovo-appuntamento {
            margin-right: 0.8rem;
        }
        & > .titolo {
            margin-left: 0;
        }
    }
`;

export const ButtonGroup = styled.div`
    position: relative;
    display: inline-block;
    line-height: 3.2rem;
    border-radius: 3px;
    overflow: hidden;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
    color: #666666;
    transition: 0.2s;
    cursor: pointer;
    &.not-clickable {
        cursor: default;
    }
    &.clickable {
        &:hover {
            transform: translateY(-0.2rem);
            box-shadow: 0 0.4rem 0.4rem #cccccc;
        }
        &:active {
            transform: translateY(-0.1rem);
            box-shadow: 0 0.1rem 0.2rem #cccccc;
        }
    }

    & > span {
        display: inline-block;
        padding: 0 0.8rem;
        height: 3rem;
    }
`;

export const ButtonGroupDefault = styled(ButtonGroup)`
    color: #666666;
    background: #ededed;
    border: solid 1px #cccccc;
    line-height: 3rem;
    & > span {
        &.active {
            background: #cccccc;
        }
    }
    &.with-separators span:not(:first-child) {
        border-left: solid 1px #cccccc;
    }
`;

// export const ButtonGroupDefaultView = styled(ButtonGroupDefault)`
//     @media screen and (max-width: 749px) {
//         display: grid;
//         width: 6rem;
//         grid-template-columns: 1fr;
//         & > * {
//             position: absolute;
//             display: block !important;
//             z-index: 0;
//             width: 100%;
//         }
//         &:hover > * {
//             position: relative;
//         }
//         & .active {
//             z-index: 2;
//         }
//     }
// `;

export const ButtonGroupPrimary = styled(ButtonGroup)`
    color: white;
    background: #65cc34;
    border: solid 1px #52c41a;
    line-height: 3rem;
    &.with-separators span:not(:first-child) {
        border-left: solid 1px #65cc34;
    }
`;

export const ButtonGroupIcon = styled(ButtonGroup)`
    & span:hover {
        color: #65cc34;
    }
`;

export const ButtonGroupUserIcon = styled.div`
    position: relative;
    text-align: center;
    line-height: 1.5rem;
    & i {
        line-height: 3.2rem;
    }
    &.icon-user > * {
        background: #8b11c3;
        border-radius: 50%;
        height: 3rem;
        width: 3rem;
        color: white;
    }
`;
