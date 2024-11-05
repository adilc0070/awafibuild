import { IPaymentGateway } from './IPaymentGateway';
export declare class PaymentGatewayFactory {
    private static gateways;
    static getGateway(type: string): IPaymentGateway;
}
