"use strict";
// src/presentation/controllers/cartController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
class CartController {
    cartInteractor; // Use the Cart interactor interface
    constructor(cartInteractor) {
        this.cartInteractor = cartInteractor;
    }
    // Create a new cart (HTTP POST)
    async createCart(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const cartData = { userId, items: [] }; // Initialize with an empty items array
            await this.cartInteractor.createCart(cartData);
            res.status(201).json({ message: "Cart created successfully" });
        }
        catch (error) {
            next(error);
        }
    }
    // Get a cart by user ID (HTTP GET)
    async getCartByUserId(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const cart = await this.cartInteractor.getCartByUserId(userId);
            if (cart == null) {
                res.status(204).json({ message: "cart is null" });
            }
            if (cart) {
                res.status(200).json({ data: cart });
            }
            else {
                res.status(404).json({ message: "Cart not found" });
            }
        }
        catch (error) {
            next(error);
        }
    }
    // Add item to cart (HTTP POST)
    async addItemToCart(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const itemData = {
                userId,
                productId: req.body.productId,
                variantId: req.body.variantId,
                quantity: req.body.quantity,
            };
            console.log(itemData);
            const updatedCart = await this.cartInteractor.addItemToCart(itemData);
            res.status(200).json(updatedCart);
        }
        catch (error) {
            console.log("error: ", error);
            next(error);
        }
    }
    // Update item quantity in cart (HTTP PUT)
    async updateCartItemQuantity(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const itemData = {
                userId,
                productId: req.body.productId,
                variantId: req.body.variantId,
                quantity: req.body.quantity,
            };
            const updatedCart = await this.cartInteractor.updateCartItemQuantity(itemData);
            res.status(200).json(updatedCart);
        }
        catch (error) {
            next(error);
        }
    }
    // Remove item from cart (HTTP POST)
    async removeItemFromCart(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const itemData = {
                userId,
                productId: req.body.productId,
                variantId: req.body.variantId,
            };
            const updatedCart = await this.cartInteractor.removeItemFromCart(itemData);
            res.status(200).json(updatedCart);
        }
        catch (error) {
            next(error);
        }
    }
    // Clear cart (HTTP DELETE)
    async clearCart(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const cleared = await this.cartInteractor.deleteCart(userId);
            if (cleared) {
                res.status(200).json({ message: "Cart cleared successfully" });
            }
            else {
                res.status(404).json({ message: "Cart not found" });
            }
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CartController = CartController;
//# sourceMappingURL=cartController.js.map