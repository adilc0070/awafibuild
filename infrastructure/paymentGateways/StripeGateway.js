"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripePaymentGateway = void 0;
const stripe_1 = __importDefault(require("stripe"));
const env_1 = __importDefault(require("../../config/env")); // Ensure you have Stripe keys in envConfig
class StripePaymentGateway {
    stripe;
    constructor() {
        this.stripe = new stripe_1.default(env_1.default.STRIPE_SECRET_KEY, {
            apiVersion: '2024-09-30.acacia',
        });
    }
    async initiatePayment(paymentData) {
        const { items, shippingAddress } = paymentData;
        // Calculate the total amount in cents for Stripe
        const totalAmount = items.reduce((total, item) => {
            return total + (item.price * item.quantity * 100); // Convert to cents
        }, 0);
        // Create metadata with product details
        const productMetadata = items.map((item, index) => ({
            [`product_${index + 1}_name`]: `${item.name} - ${item.weight}`,
            [`product_${index + 1}_quantity`]: item.quantity,
            [`product_${index + 1}_price`]: item.price,
        })).reduce((acc, curr) => ({ ...acc, ...curr }), {}); // Flatten to a single object
        try {
            console.log("Initiating Stripe customer and ephemeral key creation...");
            // Create a Stripe customer
            const customer = await this.stripe.customers.create();
            console.log("Customer created successfully:", customer.id);
            // Create an ephemeral key for the customer
            const ephemeralKey = await this.stripe.ephemeralKeys.create({ customer: customer.id }, { apiVersion: '2024-09-30.acacia' });
            console.log("Ephemeral key created successfully:", ephemeralKey.id);
            // Create a PaymentIntent for the transaction
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: totalAmount,
                currency: 'usd',
                description: 'Order payment',
                metadata: {
                    ...productMetadata,
                    customerName: shippingAddress.fullName,
                    customerPhone: shippingAddress.phone,
                    shippingAddress: `${shippingAddress.addressLine1}, ${shippingAddress.addressLine2}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`
                },
                shipping: {
                    name: shippingAddress.fullName,
                    address: {
                        line1: shippingAddress.addressLine1,
                        line2: shippingAddress.addressLine2,
                        city: shippingAddress.city,
                        postal_code: shippingAddress.postalCode,
                        country: shippingAddress.country
                    },
                    phone: shippingAddress.phone
                },
            });
            console.log("Payment intent created successfully:", paymentIntent);
            // Return paymentIntent details, ephemeral key, and publishable key
            return {
                paymentIntent: paymentIntent.id,
                ephemeralKey: ephemeralKey.id,
                publishableKey: env_1.default.STRIPE_PUBLIC_KEY,
                customer: customer.id
            };
        }
        catch (error) {
            console.error("Stripe payment initiation error:", error);
            // Handle Stripe-specific errors
            if (error instanceof stripe_1.default.errors.StripeError) {
                throw new Error(`Stripe error: ${error.message}`);
            }
            // Handle network or unexpected errors
            throw new Error(`An unexpected error occurred during payment initiation: ${error.message}`);
        }
    }
}
exports.StripePaymentGateway = StripePaymentGateway;
//# sourceMappingURL=StripeGateway.js.map