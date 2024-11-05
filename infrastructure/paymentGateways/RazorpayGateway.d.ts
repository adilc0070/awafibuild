import { IPaymentGateway } from './IPaymentGateway';
export declare class RazorpayGateway implements IPaymentGateway {
    private razorpay;
    constructor();
    initiatePayment(amount: number, currency: string, options?: any): Promise<any>;
    verifyPayment(paymentId: string, signature: string): Promise<boolean>;
}
