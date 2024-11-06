import ICartRepo from "../../interface/cartInterface/IcartRepo";
import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo";
import ICheckoutInteractor from "../../interface/checkoutInterface/IcheckoutInteractor";
import { CheckoutDTO } from "../../domain/dtos/CheckoutDTO";
import { IPaymentGateway } from "../../infrastructure/paymentGateways/IPaymentGateway";
import { IproductRepo } from "../../interface/productInterface/IproductRepo";
export declare class CheckoutInteractor implements ICheckoutInteractor {
    private cartRepo;
    private checkoutRepo;
    private productRepo;
    private paymentGateway;
    constructor(cartRepo: ICartRepo, checkoutRepo: ICheckoutRepo, productRepo: IproductRepo, paymentGateway: IPaymentGateway);
    getSecretKey(paymentMethod: 'Razorpay' | 'Stripe'): Promise<{
        secretKey: string;
    }>;
    processCheckout(data: CheckoutDTO): Promise<any>;
}
