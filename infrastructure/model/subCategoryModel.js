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
const mongoose_1 = __importStar(require("mongoose"));
// Define the Category schema
const SubCategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Optional: Ensure that category names are unique
    },
    description: {
        type: String,
        required: false, // Optional: make this field required or not
        trim: true,
    },
    mainCategory: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'MainCategory', // Optional: make this field required or not
        trim: true,
    },
    isListed: {
        type: Boolean,
        default: true, // Default value is true
    },
    isDeleted: {
        type: Boolean,
        default: false, // Default value is false
    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
// Export the model
const SubCategory = mongoose_1.default.model('SubCategory', SubCategorySchema);
exports.default = SubCategory;
//# sourceMappingURL=subCategoryModel.js.map