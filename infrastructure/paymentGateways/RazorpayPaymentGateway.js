"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayPaymentGateway = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const env_1 = __importDefault(require("../../config/env")); // Make sure to have your keys in envConfig
class RazorpayPaymentGateway {
    razorpay;
    constructor() {
        this.razorpay = new razorpay_1.default({
            key_id: env_1.default.RAZORPAY_KEY_ID,
            key_secret: env_1.default.RAZORPAY_SECRET_KEY,
        });
    }
    async initiatePayment(paymentData) {
        console.log("razorpay is intiating");
        try {
            const options = {
                amount: 30 * 100, // Razorpay works with paise (1 INR = 100 paise)
                currency: 'usd',
                receipt: "description", // Optional: You can also use order ID or custom receipt
                payment_capture: 1, // 1 means automatic capture
            };
            const order = await this.razorpay.orders.create(options);
            return order;
        }
        catch (error) {
            throw new Error('Razorpay payment initiation failed: ' + error.message);
        }
    }
}
exports.RazorpayPaymentGateway = RazorpayPaymentGateway;
//# sourceMappingURL=RazorpayPaymentGateway.js.map