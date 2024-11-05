"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the structure for product descriptions
// Create the product schema
const productSchema = new mongoose_1.Schema({
    sku: { type: String, required: false },
    ean: { type: String, required: false },
    name: { type: String, required: true },
    descriptions: [{
            header: { type: String, required: true },
            content: { type: String, required: true }
        }],
    isListed: {
        type: Boolean,
        default: true,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false,
        required: true
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'MainCategory',
        required: false
    },
    subCategory: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: false
    },
    images: [
        { type: String, required: true }
    ],
    variants: [
        {
            weight: { type: String, required: false },
            inPrice: { type: Number, required: false },
            outPrice: { type: Number, required: false },
            stockQuantity: { type: Number, required: false }
        }
    ]
}, { timestamps: true });
// Export the Product model
exports.ProductModel = mongoose_1.default.model('Product', productSchema);
//# sourceMappingURL=producModel.js.map