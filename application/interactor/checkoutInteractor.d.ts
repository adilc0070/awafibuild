import ICartRepo from "../../interface/cartInterface/IcartRepo";
import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo";
import ICheckoutInteractor from "../../interface/checkoutInterface/IcheckoutInteractor";
import { CheckoutDTO } from "../../domain/dtos/CheckoutDTO";
import { IproductRepo } from "../../interface/productInterface/IproductRepo";
import { IPaymentGateway } from "../../infrastructure/paymentGateways/IPaymentGateway";
export declare class CheckoutInteractor implements ICheckoutInteractor {
    private cartRepo;
    private checkoutRepo;
    private productRepo;
    private stripePaymentGateway;
    private taabyPaymentGateway;
    constructor(cartRepo: ICartRepo, checkoutRepo: ICheckoutRepo, productRepo: IproductRepo, stripePaymentGateway: IPaymentGateway, taabyPaymentGateway: IPaymentGateway);
    getSecretKey(paymentMethod: 'Stripe' | 'Tabby' | 'Tamara'): Promise<{
        secretKey: string;
    }>;
    getVerifyPayment(paymentMethod: 'Stripe' | 'Tabby' | 'Tamara', clientSecret: string): Promise<boolean>;
    processCheckout({ userId, shippingAddress, paymentMethod, currency, amount, transactionId, paymentStatus, }: CheckoutDTO): Promise<any>;
}
