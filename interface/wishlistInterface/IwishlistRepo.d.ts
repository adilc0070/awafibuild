import { IWishlistReturnDTO, WishlistDTO } from "../../domain/dtos/WishlistDTO";
import { IWishlist } from "../../domain/entities/wishlistSchema";
export default interface IWishlistRepo {
    createWishlist(data: WishlistDTO): Promise<IWishlist>;
    findWishlistByUser(userId: string): Promise<IWishlistReturnDTO | null>;
    addItemToWishlist(userId: string, productId: string, variantId: string): Promise<IWishlist | null>;
    removeItemFromWishlist(userId: string, productId: string, variantId: string): Promise<IWishlist | null>;
    deleteWishlist(userId: string): Promise<IWishlist | null>;
}
