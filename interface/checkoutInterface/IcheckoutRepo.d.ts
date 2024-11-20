import { CheckoutCreateDTO } from "../../domain/dtos/CheckoutDTO";
import { ICheckout } from "../../domain/entities/checkoutSchema";
export default interface ICheckoutRepo {
    createCheckout(data: CheckoutCreateDTO): Promise<ICheckout>;
}
