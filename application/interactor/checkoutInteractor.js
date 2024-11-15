"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutInteractor = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("../../config/env"));
class CheckoutInteractor {
    cartRepo;
    checkoutRepo;
    productRepo; // Declare productRepo
    constructor(cartRepo, checkoutRepo, productRepo) {
        this.cartRepo = cartRepo;
        this.checkoutRepo = checkoutRepo;
        this.productRepo = productRepo; // Initialize productRepo
    }
    async getSecretKey(paymentMethod) {
        if (paymentMethod === "Razorpay") {
            return { secretKey: env_1.default.RAZORPAY_SECRET_KEY };
        }
        else if (paymentMethod === "Stripe") {
            return { secretKey: env_1.default.STRIPE_SECRET_KEY };
        }
        return { secretKey: "no value" };
    }
    async getSecretKey(paymentMethod) {
        console.log("payment method", paymentMethod);
        if (paymentMethod === "Razorpay") {
            return { secretKey: env_1.default.RAZORPAY_SECRET_KEY };
        }
        else if (paymentMethod === "Stripe") {
            return { secretKey: env_1.default.STRIPE_SECRET_KEY };
        }
        return { secretKey: "no value" };
    }
    async processCheckout(data) {
        // Find the user's cart
<<<<<<< HEAD
        const cartItems = await this.cartRepo.findCartByUser(data.userId);
        console.log(cartItems);
        if (!cartItems)
=======
        const cart = await this.cartRepo.findCartByUser(data.userId);
        if (!cart)
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
            throw new Error("Cart not found");
        // Prepare the checkout data to be saved
        const checkoutData = {
            user: new mongoose_1.default.Types.ObjectId(data.userId),
            amount: data.amount,
            paymentMethod: data.paymentMethod,
            orderPlacedAt: new Date(data.time),
            deliveredAt: new Date(new Date(data.time).getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days after order time
<<<<<<< HEAD
            cart: cartItems._id,
            items: cartItems,
=======
            cart: cart._id,
            items: cart.items,
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
            currency: data.currency,
            shippingAddress: data.shippingAddress, // Add shipping address
            transactionId: data.transactionId, // Add transaction ID
            paymentStatus: data.paymentStatus // Set initial payment status
        };
        // Save the checkout data in the database
        const checkoutResult = await this.checkoutRepo.createCheckout(checkoutData);
        // Clear the cart after successful checkout
        await this.cartRepo.clearCart(data.userId);
        return checkoutResult; // Return checkout result for frontend reference
    }
}
exports.CheckoutInteractor = CheckoutInteractor;
//# sourceMappingURL=checkoutInteractor.js.map