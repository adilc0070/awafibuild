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
import { IWishlistReturnDTO, WishlistDTO } from "../../domain/dtos/WishlistDTO";
import { Model } from "mongoose";
import { IWishlist } from "../../domain/entities/wishlistSchema";
import { BaseRepository } from "./baseRepository";
import IWishlistRepo from "../../interface/wishlistInterface/IwishlistRepo";
export declare class WishlistRepository extends BaseRepository<IWishlist> implements IWishlistRepo {
    constructor(model: Model<IWishlist>);
    private getOrCreateWishlist;
    private validateObjectId;
    createWishlist(data: WishlistDTO): Promise<IWishlist>;
    findWishlistByUser(userId: string): Promise<IWishlistReturnDTO | null>;
    addItemToWishlist(userId: string, productId: string, variantId: string): Promise<IWishlist>;
    removeItemFromWishlist(userId: string, productId: string, variantId: string): Promise<IWishlist | null>;
    deleteWishlist(userId: string): Promise<IWishlist | null>;
}
