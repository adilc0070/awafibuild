import { IPaymentGateway } from './IPaymentGateway';
export declare class StripePaymentGateway implements IPaymentGateway {
    private stripe;
    constructor();
    verifyPayment(clientSecret: string): Promise<boolean>;
}
