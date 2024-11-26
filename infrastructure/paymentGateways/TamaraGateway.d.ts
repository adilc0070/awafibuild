import { IPaymentGateway } from './IPaymentGateway';
export declare class TamaraPaymentGateway implements IPaymentGateway {
    private stripe;
    constructor();
    verifyPayment(clientSecret: string): Promise<boolean>;
}
