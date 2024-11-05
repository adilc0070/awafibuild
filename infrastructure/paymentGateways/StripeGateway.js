"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeGateway = void 0;
// infrastructure/paymentGateways/StripeGateway.ts
const stripe_1 = __importDefault(require("stripe"));
const env_1 = __importDefault(require("../../config/env"));
class StripeGateway {
    stripe;
    constructor() {
        this.stripe = new stripe_1.default(env_1.default.STRIPE_SECRET_KEY || '', {
            // @ts-ignore
            apiVersion: '2020-08-27',
        });
    }
    async initiatePayment(amount, currency, stripeOptions, otherOptions) {
        try {
            const lineItems = otherOptions?.products.map((product) => ({
                price_data: {
                    currency: currency || 'usd',
                    product_data: {
                        name: product.name,
                        variant: product.variant,
                        quantity: product.quantity
                    },
                    unit_amount: amount, // Amount per item; adjust this if each product has a different price
                },
                quantity: product.quantity,
            }));
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: otherOptions?.successUrl || 'https://localhost:3000/success',
                cancel_url: otherOptions?.cancelUrl || 'https://localhost:3000/cancel',
            });
            return {
                success: true,
                data: session,
                gatewayReference: session.id,
            };
        }
        catch (error) {
            return {
                success: false,
                data: null,
                error: error.message || 'Failed to create payment session',
            };
        }
    }
    async verifyPayment(paymentId, signature) {
        try {
            // Here you would implement Stripe's webhook signature verification
            // using stripe.webhooks.constructEvent()
            return true;
        }
        catch (error) {
            console.error('Payment verification failed:', error.message);
            return false;
        }
    }
}
exports.StripeGateway = StripeGateway;
//# sourceMappingURL=StripeGateway.js.map