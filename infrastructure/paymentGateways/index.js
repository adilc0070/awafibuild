"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/paymentGateways/index.ts
const env_1 = __importDefault(require("../../config/env"));
const RazorpayGateway_1 = require("./RazorpayGateway");
const StripeGateway_1 = require("./StripeGateway");
// Choose your payment gateway here
const paymentGateway = env_1.default.PAYMENT_GATEWAY === 'razorpay'
    ? new RazorpayGateway_1.RazorpayGateway()
    : new StripeGateway_1.StripeGateway();
exports.default = paymentGateway;
//# sourceMappingURL=index.js.map