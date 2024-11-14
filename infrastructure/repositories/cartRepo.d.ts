import { CartDTO } from "../../domain/dtos/CartDTO";
import { Model } from "mongoose";
import { IUserCart } from "../../domain/entities/userCartSchema";
import { BaseRepository } from "./baseRepository";
import ICartRepo from "../../interface/cartInterface/IcartRepo";
import mongoose from "mongoose";
export declare class CartRepository extends BaseRepository<IUserCart> implements ICartRepo {
    constructor(model: Model<IUserCart>);
    createCart(data: CartDTO): Promise<IUserCart>;
    findCartByUser(userId: string): Promise<IUserCart | null>;
    checkProductAvailability(productId: string, variantId: string, quantity: number): Promise<boolean>;
    addItemToCart(userId: string, productId: string, variantId: string, quantity: number): Promise<IUserCart | null>;
    updateItemQuantity(userId: string, productId: string, variantId: string, quantity: number): Promise<IUserCart | null>;
    removeItemFromCart(userId: string, productId: string, variantId: string): Promise<IUserCart | null>;
    findByCartId(cartId: mongoose.Types.ObjectId): Promise<IUserCart | null>;
    clearCart(userId: string): Promise<IUserCart | null>;
}
