import { IService } from 'Common/interfaces';

export interface IServiceProps {
    services: IService[];
    selectedServiceIds?: number[];
    onServiceStateChange?: (serviceId: number, checked: boolean) => any;
}
