export interface IRadioGroupListProps {
    items: Array<{ id: any; content: any }>;
    defaultSelectedValue?: number | null;
    onItemSelection?: (selectedItemIndex: number) => any;
}

export interface IRadioGroupListPropsState {
    value: any;
}
