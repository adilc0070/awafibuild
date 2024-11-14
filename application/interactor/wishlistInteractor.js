"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistInteractor = void 0;
class WishlistInteractor {
    wishlistRepo; // Use the IWishlistRepo interface
    constructor(wishlistRepo) {
        this.wishlistRepo = wishlistRepo;
    }
    async createWishlist(data) {
        const wishlist = await this.wishlistRepo.createWishlist(data);
        return this.mapToDTO(wishlist);
    }
    async getWishlistByUserId(userId) {
        const wishlist = await this.wishlistRepo.findWishlistByUser(userId);
        //DEBUG
        //@ts-ignore
        return wishlist;
        // return wishlist ? this.mapToDTO(wishlist) : null;
    }
    async addItemToWishlist(data) {
        const updatedWishlist = await this.wishlistRepo.addItemToWishlist(data.userId, data.productId, data.variantId);
        return updatedWishlist ? this.mapToDTO(updatedWishlist) : null;
    }
    async removeItemFromWishlist(data) {
        const updatedWishlist = await this.wishlistRepo.removeItemFromWishlist(data.userId, data.productId, data.variantId);
        return updatedWishlist ? this.mapToDTO(updatedWishlist) : null;
    }
    async deleteWishlist(userId) {
        const deletedWishlist = await this.wishlistRepo.deleteWishlist(userId);
        return !!deletedWishlist;
    }
    mapToDTO(iWishlist) {
        return {
            userId: iWishlist.user.toString(),
            items: iWishlist.items.map(item => ({
                productId: item.productId.toString(),
                variantId: item.variantId.toString() // Ensure variantId is also included
            }))
        };
    }
}
exports.WishlistInteractor = WishlistInteractor;
//# sourceMappingURL=wishlistInteractor.js.map