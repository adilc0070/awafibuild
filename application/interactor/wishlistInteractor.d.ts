import IWishlistRepo from "../../interface/wishlistInterface/IwishlistRepo";
import IWishlistInteractor from "../../interface/wishlistInterface/IwishlistInteractor";
import { WishlistDTO, AddToWishlistDTO, RemoveFromWishlistDTO } from "../../domain/dtos/WishlistDTO";
export declare class WishlistInteractor implements IWishlistInteractor {
    private wishlistRepo;
    constructor(wishlistRepo: IWishlistRepo);
    createWishlist(data: WishlistDTO): Promise<WishlistDTO>;
    getWishlistByUserId(userId: string): Promise<WishlistDTO | null>;
    addItemToWishlist(data: AddToWishlistDTO): Promise<WishlistDTO | null>;
    removeItemFromWishlist(data: RemoveFromWishlistDTO): Promise<WishlistDTO | null>;
    deleteWishlist(userId: string): Promise<boolean>;
    private mapToDTO;
}
