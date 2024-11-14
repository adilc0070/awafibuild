"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartInteractor = void 0;
class CartInteractor {
    cartRepo;
    constructor(cartRepo) {
        this.cartRepo = cartRepo;
    }
    async createCart(data) {
        const cart = await this.cartRepo.createCart(data);
        return this.mapToDTO(cart);
    }
    async getCartByUserId(userId) {
        const cart = await this.cartRepo.findCartByUser(userId);
        //@ts-ignore
        return cart ? cart : null;
        // return cart ? this.mapToDTO(cart) : null;
    }
    async addItemToCart(data) {
        const updatedCart = await this.cartRepo.addItemToCart(data.userId, data.productId, data.variantId, data.quantity);
        return updatedCart ? this.mapToDTO(updatedCart) : null;
    }
    async updateCartItemQuantity(data) {
        const updatedCart = await this.cartRepo.updateItemQuantity(data.userId, data.productId, data.variantId, data.quantity);
        return updatedCart ? this.mapToDTO(updatedCart) : null;
    }
    async removeItemFromCart(data) {
        const updatedCart = await this.cartRepo.removeItemFromCart(data.userId, data.productId, data.variantId);
        return updatedCart ? this.mapToDTO(updatedCart) : null;
    }
    async deleteCart(userId) {
        const deletedCart = await this.cartRepo.clearCart(userId);
        return !!deletedCart;
    }
    mapToDTO(iCart) {
        return {
            userId: iCart.user.toString(),
            items: iCart.items.map(item => ({
                productId: item.product.toString(),
                variantId: item.variant.toString(),
                quantity: item.quantity
            })),
        };
    }
}
exports.CartInteractor = CartInteractor;
//# sourceMappingURL=cartInteractor.js.map