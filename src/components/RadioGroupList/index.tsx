import * as React from 'react';
import { Radio } from 'antd';
import { IRadioGroupListProps, IRadioGroupListPropsState } from './interfaces';
import { ReactStandarProps } from 'Common/interfaces';

const RadioGroup = Radio.Group;

class RadioGroupList extends React.Component<
    IRadioGroupListProps & ReactStandarProps,
    IRadioGroupListPropsState
> {
    constructor(props: IRadioGroupListProps) {
        super(props);
        console.log('defaultSelectedValue', props.defaultSelectedValue);
        this.state = {
            value: props.defaultSelectedValue || '#'
        };
    }

    onChange = (e: any) => {
        this.setState({
            value: e.target.value
        });
    };

    render() {
        const { items } = this.props;
        return (
            <RadioGroup onChange={this.onChange} value={this.state.value}>
                {items.map(this.renderRadio)}
            </RadioGroup>
        );
    }

    private renderRadio = ({ id, content }: { id: any; content: any }) => {
        const { onItemSelection } = this.props;
        const onClick = onItemSelection
            ? { onClick: () => onItemSelection(id) }
            : {};
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px'
        };

        return (
            <Radio key={id} {...onClick} style={radioStyle} value={id}>
                {content}
            </Radio>
        );
    };
}

export default RadioGroupList;
