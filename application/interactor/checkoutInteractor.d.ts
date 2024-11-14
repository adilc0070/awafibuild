import ICartRepo from "../../interface/cartInterface/IcartRepo";
import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo";
import ICheckoutInteractor from "../../interface/checkoutInterface/IcheckoutInteractor";
import { CheckoutDTO } from "../../domain/dtos/CheckoutDTO";
import { IproductRepo } from "../../interface/productInterface/IproductRepo";
export declare class CheckoutInteractor implements ICheckoutInteractor {
    private cartRepo;
    private checkoutRepo;
    private productRepo;
    constructor(cartRepo: ICartRepo, checkoutRepo: ICheckoutRepo, productRepo: IproductRepo);
    getSecretKey(paymentMethod: 'Razorpay' | 'Stripe'): Promise<{
        secretKey: string;
    }>;
    processCheckout(data: CheckoutDTO): Promise<any>;
}
