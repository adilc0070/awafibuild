export interface IPaymentGateway {
    verifyPayment(clientSecret: string): Promise<boolean>;
}
