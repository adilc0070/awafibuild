"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRepository = void 0;
const mongoose_1 = require("mongoose"); // Import Types for ObjectId
const baseRepository_1 = require("./baseRepository");
// Wishlist repository extending the base repository and implementing IWishlistRepo
class WishlistRepository extends baseRepository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async getOrCreateWishlist(userId) {
        const wishlist = await this.model.findOne({ user: userId }).exec();
        if (!wishlist) {
            return await this.createWishlist({ userId, items: [] });
        }
        return wishlist;
    }
    validateObjectId(id, type) {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new Error(`Invalid ${type} ID`);
        }
    }
    async createWishlist(data) {
        try {
            const wishlistEntity = { user: data.userId, items: data.items };
            return await super.create(wishlistEntity);
        }
        catch (error) {
            console.error(`Error creating wishlist for user ${data.userId}: ${error.message}`);
            throw new Error(`Error creating wishlist: ${error.message}`);
        }
    }
    async findWishlistByUser(userId) {
        try {
            this.validateObjectId(userId, 'User');
            return await this.getOrCreateWishlist(userId);
        }
        catch (error) {
            console.error(`Error finding wishlist for user ${userId}: ${error.message}`);
            throw new Error(`Error finding wishlist: ${error.message}`);
        }
    }
    async addItemToWishlist(userId, productId, variantId) {
        try {
            this.validateObjectId(userId, 'User');
            this.validateObjectId(productId, 'Product');
            // Convert to ObjectId
            const productObjectId = new mongoose_1.Types.ObjectId(productId);
            console.log("productObjectId: ", productObjectId);
            const variantObjectId = new mongoose_1.Types.ObjectId(variantId);
            console.log("variantObjectId: ", variantObjectId);
            const wishlist = await this.getOrCreateWishlist(userId);
            // Check if the item with the specific variant already exists
            const existingItem = wishlist.items.find(item => item.productId.equals(productObjectId) && item.variantId.equals(variantObjectId) // Use equals for ObjectId comparison
            );
            console.log("existingItem: ", existingItem);
            if (existingItem) {
                console.warn(`Item with variant ${variantId} already exists in wishlist for user ${userId}`);
                throw new Error('Item with this variant already exists in the wishlist');
            }
            const newItem = { productId: productObjectId, variantId: variantObjectId }; // Store as ObjectId
            return await this.model.findOneAndUpdate({ user: userId }, { $addToSet: { items: newItem } }, { new: true, upsert: true }).exec();
        }
        catch (error) {
            console.error(`Error adding item to wishlist for user ${userId}: ${error.message}`);
            throw new Error(`Error adding item to wishlist: ${error.message}`);
        }
    }
    async removeItemFromWishlist(userId, productId, variantId) {
        try {
            this.validateObjectId(userId, 'User');
            this.validateObjectId(productId, 'Product');
            // Convert to ObjectId
            const productObjectId = new mongoose_1.Types.ObjectId(productId);
            const variantObjectId = new mongoose_1.Types.ObjectId(variantId);
            return await this.model.findOneAndUpdate({ user: userId }, { $pull: { items: { productId: productObjectId, variantId: variantObjectId } } }, { new: true }).exec();
        }
        catch (error) {
            console.error(`Error removing item from wishlist for user ${userId}: ${error.message}`);
            throw new Error(`Error removing item from wishlist: ${error.message}`);
        }
    }
    async deleteWishlist(userId) {
        try {
            this.validateObjectId(userId, 'User');
            return await this.model.findOneAndDelete({ user: userId }).exec();
        }
        catch (error) {
            console.error(`Error deleting wishlist for user ${userId}: ${error.message}`);
            throw new Error(`Error deleting wishlist: ${error.message}`);
        }
    }
}
exports.WishlistRepository = WishlistRepository;
//# sourceMappingURL=wishlistRepo.js.map