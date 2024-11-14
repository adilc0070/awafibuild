import { IPaymentGateway } from './IPaymentGateway';
export declare class RazorpayPaymentGateway implements IPaymentGateway {
    private razorpay;
    constructor();
    initiatePayment(paymentData: any): Promise<import("razorpay/dist/types/orders").Orders.RazorpayOrder>;
}
