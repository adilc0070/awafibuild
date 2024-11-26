"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TamaraPaymentGateway = void 0;
const stripe_1 = __importDefault(require("stripe"));
const env_1 = __importDefault(require("../../config/env"));
class TamaraPaymentGateway {
    stripe;
    constructor() {
        this.stripe = new stripe_1.default(env_1.default.STRIPE_SECRET_KEY);
    }
    async verifyPayment(clientSecret) {
        try {
            // const { paymentIntent } = await this.stripe.retrievePaymentIntent(clientSecret);
            // if (paymentIntent && paymentIntent.status === 'succeeded') {
            //     return true;
            // }
        }
        catch (error) {
            console.error('Error verifying payment:', error);
        }
        return false;
    }
}
exports.TamaraPaymentGateway = TamaraPaymentGateway;
//# sourceMappingURL=TamaraGateway.js.map