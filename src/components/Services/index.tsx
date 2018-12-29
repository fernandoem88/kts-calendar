import * as React from 'react';
import {
    ServicesContainer,
    ServicesHeader,
    ServiceItemsList,
    ServiceItem,
    ServiceItemContent
} from './styled';
import { IServiceProps } from './interfaces';
import { ReactStandarProps } from 'Common/interfaces';
import { Checkbox } from 'antd';

export default class Services extends React.Component<
    IServiceProps & ReactStandarProps
> {
    render() {
        return (
            <ServicesContainer>
                <ServicesHeader className="service-header">
                    i servizi attivi
                </ServicesHeader>
                <ServiceItemsList className="service-item-list">
                    {this.renderServices()}
                </ServiceItemsList>
            </ServicesContainer>
        );
    }

    private onServiceStateChange = ({ target }: any) => {
        const serviceId = target['data-service-id'];
        const checked = target.checked;
        const { onServiceStateChange } = this.props;
        if (onServiceStateChange) {
            onServiceStateChange(serviceId, checked);
        }
    };

    private renderServices = () => {
        const { services, selectedServiceIds = [] } = this.props;
        return services.map((service, index) => {
            const { id, serviceName, color } = service;
            const checked = selectedServiceIds.indexOf(id) !== -1;
            const unselectedClass = checked ? '' : ' unselected-service';
            return (
                <ServiceItem key={id} color={color} className="serice-item">
                    <Checkbox
                        data-service-id={id}
                        checked={checked}
                        className="service-checkbox"
                        onChange={this.onServiceStateChange}
                    />

                    <ServiceItemContent
                        className={'service-name' + unselectedClass}
                    >
                        {serviceName}
                    </ServiceItemContent>
                </ServiceItem>
            );
        });
    };
}
