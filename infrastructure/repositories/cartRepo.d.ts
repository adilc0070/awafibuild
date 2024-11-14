/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
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
