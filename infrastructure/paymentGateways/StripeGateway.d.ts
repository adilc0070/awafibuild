import { IPaymentGateway } from './IPaymentGateway';
export declare class StripePaymentGateway implements IPaymentGateway {
    private stripe;
    constructor();
    initiatePayment(paymentData: any): Promise<{
        paymentIntent: string;
        ephemeralKey: string;
        publishableKey: string;
        customer: string;
    }>;
}
