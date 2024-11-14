import ICartRepo from "../../interface/cartInterface/IcartRepo";
import ICartInteractor from "../../interface/cartInterface/IcartInteractor";
import { CartDTO, AddToCartDTO, UpdateCartQuantityDTO, RemoveFromCartDTO } from "../../domain/dtos/CartDTO";
export declare class CartInteractor implements ICartInteractor {
    private cartRepo;
    constructor(cartRepo: ICartRepo);
    createCart(data: CartDTO): Promise<CartDTO>;
    getCartByUserId(userId: string): Promise<CartDTO | null>;
    addItemToCart(data: AddToCartDTO): Promise<CartDTO | null>;
    updateCartItemQuantity(data: UpdateCartQuantityDTO): Promise<CartDTO | null>;
    removeItemFromCart(data: RemoveFromCartDTO): Promise<CartDTO | null>;
    deleteCart(userId: string): Promise<boolean>;
    private mapToDTO;
}
