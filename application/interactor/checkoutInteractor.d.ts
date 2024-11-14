import ICartRepo from "../../interface/cartInterface/IcartRepo";
import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo";
import ICheckoutInteractor from "../../interface/checkoutInterface/IcheckoutInteractor";
import { CheckoutDTO } from "../../domain/dtos/CheckoutDTO";
import { IproductRepo } from "../../interface/productInterface/IproductRepo";
export declare class CheckoutInteractor implements ICheckoutInteractor {
    private cartRepo;
    private checkoutRepo;
    private productRepo;
<<<<<<< HEAD
    constructor(cartRepo: ICartRepo, checkoutRepo: ICheckoutRepo, productRepo: IproductRepo);
=======
    private paymentGateway;
    constructor(cartRepo: ICartRepo, checkoutRepo: ICheckoutRepo, productRepo: IproductRepo, paymentGateway: IPaymentGateway);
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
    getSecretKey(paymentMethod: 'Razorpay' | 'Stripe'): Promise<{
        secretKey: string;
    }>;
    processCheckout(data: CheckoutDTO): Promise<any>;
}
