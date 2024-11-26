"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabbyPaymentGateway = void 0;
class TabbyPaymentGateway {
    // private stripe: Stripe;
    constructor() {
        // this.stripe = new Stripe(envConfig.STRIPE_SECRET_KEY as string);
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
exports.TabbyPaymentGateway = TabbyPaymentGateway;
//# sourceMappingURL=TabbytPaymentGateway.js.map