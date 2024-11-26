import { IPaymentGateway } from './IPaymentGateway';
export declare class TabbyPaymentGateway implements IPaymentGateway {
    constructor();
    verifyPayment(clientSecret: string): Promise<boolean>;
}
