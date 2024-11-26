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
    stripePaymentGateway;
    taabyPaymentGateway;
    constructor(cartRepo, checkoutRepo, productRepo, stripePaymentGateway, taabyPaymentGateway) {
        this.cartRepo = cartRepo;
        this.checkoutRepo = checkoutRepo;
        this.productRepo = productRepo;
        this.stripePaymentGateway = stripePaymentGateway;
        this.taabyPaymentGateway = taabyPaymentGateway;
    }
    async getSecretKey(paymentMethod) {
        if (paymentMethod === "Tabby") {
            return { secretKey: env_1.default.RAZORPAY_SECRET_KEY };
        }
        else if (paymentMethod === "Stripe") {
            return { secretKey: env_1.default.STRIPE_SECRET_KEY };
        }
        else if (paymentMethod == "Tamara") {
            return { secretKey: "no value" };
        }
        return { secretKey: "no value" };
    }
    async getVerifyPayment(paymentMethod, clientSecret) {
        if (paymentMethod === "Tabby") {
            return true;
        }
        else if (paymentMethod === "Stripe") {
            return true;
        }
        else if (paymentMethod == "Tamara") {
            return true;
        }
        return false;
    }
    async processCheckout({ userId, shippingAddress, paymentMethod, currency, amount, transactionId, paymentStatus, }) {
        // Step 1: Retrieve cart items
        const response = await this.cartRepo.findCartByUser(userId);
        const inPrice = /aed/i.test(currency);
        const cartItems = response?.map((e) => {
            return {
                productId: e.productId,
                variantId: e.variantId,
                name: e.name,
                weight: e.weight,
                quantity: e.quantity,
                price: inPrice ? e.inPrice : e.outPrice,
                images: e.images
            };
        });
        if (!cartItems) {
            throw new Error("Cart not found or no items in the cart");
        }
        ;
        // Step 2: Convert user ID to ObjectId
        const userInObjectId = new mongoose_1.default.Types.ObjectId(userId);
        // Step 3: Create checkout data
        const data = {
            user: userInObjectId,
            currency,
            paymentMethod,
            orderPlacedAt: new Date(),
            items: cartItems,
            shippingAddress,
            amount,
            transactionId,
            paymentStatus,
            deliveredAt: (() => {
                const date = new Date();
                date.setDate(date.getDate() + 5); // Add 5 days to the current date
                return date;
            })(),
        };
        // Step 4: Save checkout data
        const checkout = await this.checkoutRepo.createCheckout(data);
        // Step 5: Clear the cart after successful checkout (optional)
        // await this.cartRepo.clearCart(userId);
        // Step 6: Return the checkout result
        return checkout;
    }
}
exports.CheckoutInteractor = CheckoutInteractor;
//# sourceMappingURL=checkoutInteractor.js.map