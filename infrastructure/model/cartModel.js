"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
// src/infrastructure/model/cartModel.ts
const mongoose_1 = __importDefault(require("mongoose"));
const userCartSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [
        {
            product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product", required: true },
            variant: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product.variants", required: true }, // Reference to the variant ID
            quantity: { type: Number, required: true, default: 1 }
        }
    ]
}, {
    timestamps: true
});
exports.CartModel = mongoose_1.default.model('Cart', userCartSchema);
exports.default = userCartSchema;
//# sourceMappingURL=cartModel.js.map