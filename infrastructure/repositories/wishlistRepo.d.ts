import { WishlistDTO } from "../../domain/dtos/WishlistDTO";
import { Model } from "mongoose";
import { IWishlist } from "../../domain/entities/wishlistSchema";
import { BaseRepository } from "./baseRepository";
import IWishlistRepo from "../../interface/wishlistInterface/IwishlistRepo";
export declare class WishlistRepository extends BaseRepository<IWishlist> implements IWishlistRepo {
    constructor(model: Model<IWishlist>);
    private getOrCreateWishlist;
    private validateObjectId;
    createWishlist(data: WishlistDTO): Promise<IWishlist>;
    findWishlistByUser(userId: string): Promise<IWishlist>;
    addItemToWishlist(userId: string, productId: string, variantId: string): Promise<IWishlist>;
    removeItemFromWishlist(userId: string, productId: string, variantId: string): Promise<IWishlist | null>;
    deleteWishlist(userId: string): Promise<IWishlist | null>;
}
