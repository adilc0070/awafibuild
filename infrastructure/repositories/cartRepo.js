"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const mongoose_1 = require("mongoose");
const baseRepository_1 = require("./baseRepository");
const producModel_1 = require("../model/producModel"); // Adjust the import based on your project structure
// Cart repository extending the base repository
class CartRepository extends baseRepository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async createCart(data) {
        try {
            const cartEntity = { user: data.userId, items: data.items };
            return await super.create(cartEntity);
        }
        catch (error) {
            console.error("Error creating cart:", error);
            throw new Error("Could not create cart. Please try again later.");
        }
    }
    // Repository method
    async findCartByUser(userId) {
        try {
            return await this.model
                .findOne({ user: userId })
                .exec();
        }
        catch (error) {
            console.error("Error finding cart for user:", error);
            throw new Error("Could not find cart for the user. Please check the user ID.");
        }
    }
    async checkProductAvailability(productId, variantId, quantity) {
        try {
            const product = await producModel_1.ProductModel.aggregate([
                {
                    $match: {
                        _id: new mongoose_1.Types.ObjectId(productId),
                        'variants._id': new mongoose_1.Types.ObjectId(variantId),
                    },
                },
                {
                    $unwind: '$variants',
                },
                {
                    $match: {
                        'variants._id': new mongoose_1.Types.ObjectId(variantId),
                    },
                },
                {
                    $project: {
                        stockQuantity: '$variants.stockQuantity',
                    },
                },
            ]).exec();
            if (product.length > 0 && product[0].stockQuantity >= quantity) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.error("Error checking product availability:", error);
            throw new Error("Could not check product availability. Please try again later.");
        }
    }
    async addItemToCart(userId, productId, variantId, quantity) {
        try {
            // Validate input
            if (!userId || !productId || !variantId || quantity === undefined) {
                throw new Error("Invalid input parameters: userId, productId, variantId, and quantity must be provided.");
            }
            // Check product availability
            const isAvailable = await this.checkProductAvailability(productId, variantId, quantity);
            if (!isAvailable) {
                throw new Error("Insufficient product stock.");
            }
            let cart = await this.findCartByUser(userId);
            // If the cart doesn't exist, create a new one
            if (!cart) {
                cart = await this.createCart({ userId, items: [] });
            }
            // Check if the item already exists in the cart
            const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId && item.variant.toString() === variantId);
            if (existingItemIndex >= 0) {
                // If it exists, update the quantity
                cart.items[existingItemIndex].quantity += quantity;
                return await this.model.findOneAndUpdate({ user: userId }, { items: cart.items }, // Update the entire items array
                { new: true }).exec();
            }
            else {
                // If it doesn't exist, add the new item
                return await this.model.findOneAndUpdate({ user: userId }, { $addToSet: { items: { product: productId, variant: variantId, quantity } } }, { new: true }).exec();
            }
        }
        catch (error) {
            console.error("Error adding item to cart:", error);
            throw new Error("Could not add item to cart. Please check product details and try again.");
        }
    }
    async updateItemQuantity(userId, productId, variantId, quantity) {
        try {
            const updatedCart = await this.model.findOneAndUpdate({ user: userId, "items.product": productId, "items.variant": variantId }, { $set: { "items.$.quantity": quantity } }, { new: true }).exec();
            if (!updatedCart) {
                throw new Error("Cart item not found.");
            }
            return updatedCart;
        }
        catch (error) {
            console.error("Error updating item quantity:", error);
            throw new Error("Could not update item quantity. Please check the item details.");
        }
    }
    async removeItemFromCart(userId, productId, variantId) {
        try {
            const updatedCart = await this.model.findOneAndUpdate({ user: userId }, { $pull: { items: { product: productId, variant: variantId } } }, { new: true }).exec();
            if (!updatedCart) {
                throw new Error("Cart item not found.");
            }
            return updatedCart;
        }
        catch (error) {
            console.error("Error removing item from cart:", error);
            throw new Error("Could not remove item from cart. Please check the item details.");
        }
    }
    async findByCartId(cartId) {
        try {
            const cart = await this.model.findById(cartId)
                .populate('items.product')
                .populate('items.variant')
                .exec();
            if (!cart) {
                throw new Error(`Cart not found with ID: ${cartId}`);
            }
            return cart;
        }
        catch (error) {
            console.error("Error finding cart by ID:", error);
            throw new Error("Could not find cart. Please check the cart ID and try again.");
        }
    }
    async clearCart(userId) {
        try {
            const clearedCart = await this.model.findOneAndDelete({ user: userId }).exec();
            if (!clearedCart) {
                throw new Error("Cart not found.");
            }
            return clearedCart;
        }
        catch (error) {
            console.error("Error clearing cart:", error);
            throw new Error("Could not clear the cart. Please try again later.");
        }
    }
}
exports.CartRepository = CartRepository;
//# sourceMappingURL=cartRepo.js.map