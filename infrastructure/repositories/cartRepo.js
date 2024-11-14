"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const mongoose_1 = require("mongoose");
const baseRepository_1 = require("./baseRepository");
const producModel_1 = require("../model/producModel"); // Adjust the import based on your project structure
const mongoose_2 = __importDefault(require("mongoose"));
const cartModel_1 = require("../model/cartModel");
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
<<<<<<< HEAD
    // return await this.model
    //   .findOne({ user: userId })
    //   .exec();
    // Repository method
    // @ts-ignore
    async findCartByUser(userId) {
        try {
            let cart = await this.model.findOne({ user: userId })
                .populate('items.product')
=======
    // Repository method
    async findCartByUser(userId) {
        try {
            return await this.model
                .findOne({ user: userId })
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
                .exec();
            if (!cart) {
                return null;
            }
            const transformedCart = cart.items.map(item => {
                const product = item.product; // Casting to `any` for easier access to nested fields
                const variant = product.variants.find((v) => v._id.toString() === item.variant.toString());
                return {
                    productId: product._id.toString(),
                    variantId: item.variant.toString(),
                    name: product.name,
                    quantity: item.quantity,
                    weight: variant ? variant.weight : null,
                    inPrice: variant ? variant.inPrice : null,
                    outPrice: variant ? variant.outPrice : null,
                    images: product.images[0],
                    stockQuantity: variant ? variant.stockQuantity : null,
                    rating: product.rating || 0
                };
            });
            // console.log("Transformed cart:", transformedCart);
            // @ts-ignore
            return transformedCart;
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
                throw new Error("Invalid input parameters.");
            }
            // Check product availability (your existing logic)
            const isAvailable = await this.checkProductAvailability(productId, variantId, quantity);
            if (!isAvailable) {
                throw new Error("Insufficient product stock.");
            }
            // Check if the product already exists in the cart
            const cart = await cartModel_1.CartModel.findOne({
                user: new mongoose_1.Types.ObjectId(userId),
                'items.product': new mongoose_1.Types.ObjectId(productId),
                'items.variant': new mongoose_1.Types.ObjectId(variantId),
            });
            if (cart) {
                console.log("cart: ", cart);
                // If product already exists, throw an error
                throw new Error("Product already in cart.");
            }
            // If the product does not exist, add it to the cart
            const updatedCart = await cartModel_1.CartModel.findOneAndUpdate({ user: new mongoose_1.Types.ObjectId(userId) }, {
                $push: {
                    items: {
                        product: new mongoose_1.Types.ObjectId(productId),
                        variant: new mongoose_1.Types.ObjectId(variantId),
                        quantity,
                    },
                },
            }, { new: true, upsert: true } // Create a new cart if it doesn't exist
            );
            return updatedCart;
        }
        catch (error) {
            console.error("Error adding item to cart:", error);
            throw new Error("Could not add item to cart.");
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
            // Convert IDs to ObjectId to ensure compatibility with schema
            const userObjectId = new mongoose_2.default.Types.ObjectId(userId);
            const productObjectId = new mongoose_2.default.Types.ObjectId(productId);
            const variantObjectId = new mongoose_2.default.Types.ObjectId(variantId);
            // Find the user's cart
            const cart = await this.model.findOne({ user: userObjectId });
            if (!cart) {
                console.error("Cart not found for user.");
                throw new Error("Cart item not found.");
            }
            // Filter out the matching item manually
            const updatedItems = cart.items.filter(item => !(item.product.equals(productObjectId) && item.variant.equals(variantObjectId)));
            // Check if item was actually removed
            if (updatedItems.length === cart.items.length) {
                console.error("Item to remove not found in cart.");
                throw new Error("Item not found in cart.");
            }
            // Update the cart with the filtered items array
            cart.items = updatedItems;
            const updatedCart = await cart.save();
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