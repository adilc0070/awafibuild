"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product", required: true },
    order: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Order", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: "" },
}, {
    timestamps: true,
});
// Ensure unique review per user, product, and order
reviewSchema.index({ user: 1, product: 1, order: 1 }, { unique: true });
exports.default = reviewSchema;
//# sourceMappingURL=reviewSchema.js.map