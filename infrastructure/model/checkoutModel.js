"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Checkout schema
const checkoutSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    cart: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Cart", required: false },
    items: [{
            product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product", required: false },
            variant: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Variant", required: false },
            quantity: { type: Number, required: false },
            name: { type: String, required: true },
            weight: { type: String, required: true },
            inPrice: { type: Number, required: true },
            outPrice: { type: Number, required: true },
            images: { type: String, required: true },
            stockQuantity: { type: Number, required: true },
            rating: { type: Number, default: 0 }
        }],
    paymentMethod: { type: String, enum: ['COD', 'Razorpay', 'Stripe'], required: true },
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    shippingAddress: {
        fullName: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true }
    },
    billingAddress: {
        fullName: { type: String, required: false },
        addressLine1: { type: String, required: false },
        addressLine2: { type: String, required: false },
        city: { type: String, required: false },
        postalCode: { type: String, required: false },
        country: { type: String, required: false },
        phone: { type: String, required: false }
    },
    // Payment-related fields
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    paymentFailureReason: { type: String },
    // Order status
    orderStatus: {
        type: String,
        enum: ['processing', 'shipped', 'delivered', 'cancelled'],
        default: 'processing'
    },
    // Return and refund management
    returnStatus: {
        type: String,
        enum: ['not_requested', 'requested', 'approved', 'rejected'],
        default: 'not_requested'
    },
    refundStatus: {
        type: String,
        enum: ['not_initiated', 'initiated', 'completed', 'failed'],
        default: 'not_initiated'
    },
    // Coupons
    couponCode: { type: String, required: false },
    discountAmount: { type: Number, default: 0, required: false },
    cancellationReason: { type: String, requiered: false },
    trackingId: { type: String, required: false },
    // Tracking timestamps
    paymentCompletedAt: { type: Date, required: false },
    orderPlacedAt: { type: Date, required: true },
    deliveredAt: { type: Date, required: true }
}, {
    timestamps: true
});
exports.CheckoutModel = mongoose_1.default.model("Checkout", checkoutSchema);
//# sourceMappingURL=checkoutModel.js.map