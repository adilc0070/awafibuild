import { IPaymentGateway } from './IPaymentGateway';
export declare class StripeGateway implements IPaymentGateway {
    private stripe;
    constructor();
    initiatePayment(amount: number, currency: string, stripeOptions?: {
        stripe_id: string;
    }, otherOptions?: {
        products: {
            name: string;
            quantity: number;
        }[];
        successUrl?: string;
        cancelUrl?: string;
    }): Promise<any>;
    verifyPayment(paymentId: string, signature: string): Promise<boolean>;
}
