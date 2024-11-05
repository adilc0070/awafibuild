"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentGatewayFactory = void 0;
const RazorpayGateway_1 = require("./RazorpayGateway");
const StripeGateway_1 = require("./StripeGateway");
class PaymentGatewayFactory {
    static gateways = {
        razorpay: new RazorpayGateway_1.RazorpayGateway(),
        stripe: new StripeGateway_1.StripeGateway(),
    };
    static getGateway(type) {
        const gateway = this.gateways[type.toLowerCase()];
        if (!gateway) {
            throw new Error(`Payment gateway ${type} not supported`);
        }
        return gateway;
    }
}
exports.PaymentGatewayFactory = PaymentGatewayFactory;
//# sourceMappingURL=PaymentGatewayFactory.js.map