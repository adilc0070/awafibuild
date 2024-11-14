export interface IPaymentGateway {
    initiatePayment(paymentData: any): Promise<any>;
}
export interface IPaymentGatewayResponse {
    success: boolean;
    data: any;
    gatewayReference?: string;
    error?: string;
}
