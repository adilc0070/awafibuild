"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistController = void 0;
class WishlistController {
    wishlistInteractor; // Use the Wishlist interactor interface
    constructor(wishlistInteractor) {
        this.wishlistInteractor = wishlistInteractor;
    }
    // Get a wishlist by user ID (HTTP GET)
    async getWishlistByUserId(req, res, next) {
        try {
            const userId = req.user?.id;
            console.log("userId: ", userId);
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const wishlist = await this.wishlistInteractor.getWishlistByUserId(userId);
            if (wishlist) {
                res.status(200).json({ data: wishlist });
            }
            else {
                res.status(404).json({ message: "Wishlist not found" });
            }
        }
        catch (error) {
            next(error);
        }
    }
    // Add item to wishlist (HTTP POST)
    async addItemToWishlist(req, res, next) {
        console.log(req.body);
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const itemData = req.body;
            itemData.userId = userId;
            const updatedWishlist = await this.wishlistInteractor.addItemToWishlist(itemData);
            res.status(200).json(updatedWishlist);
        }
        catch (error) {
            next(error);
        }
    }
    // Remove item from wishlist (HTTP POST)
    async removeItemFromWishlist(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const itemData = req.body;
            itemData.userId = userId;
            const updatedWishlist = await this.wishlistInteractor.removeItemFromWishlist(itemData);
            res.status(200).json(updatedWishlist);
        }
        catch (error) {
            next(error);
        }
    }
    // Create a new wishlist (HTTP POST)
    async createWishlist(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const wishlistData = req.body;
            wishlistData.userId = userId;
            await this.wishlistInteractor.createWishlist(wishlistData);
            res.status(201).json({ message: "Wishlist created successfully" });
        }
        catch (error) {
            next(error);
        }
    }
    // Delete a wishlist (HTTP DELETE)
    async deleteWishlist(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const deleted = await this.wishlistInteractor.deleteWishlist(userId);
            if (deleted) {
                res.status(200).json({ message: "Wishlist deleted successfully" });
            }
            else {
                res.status(404).json({ message: "Wishlist not found" });
            }
        }
        catch (error) {
            next(error);
        }
    }
}
exports.WishlistController = WishlistController;
//# sourceMappingURL=wishlistController.js.map