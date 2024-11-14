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
exports.BannerModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the schema for a single banner item
const bannerItemSchema = new mongoose_1.Schema({
    imageUrl: { type: String, required: true }, // URL of the banner image
    listed: { type: Boolean, required: true }, // Whether the banner is listed or active
    startDate: { type: Date, required: false }, // Optional start date for offer banners
    endDate: { type: Date, required: false }, // Optional end date for offer banners
    name: { type: String, required: true }, // Added name field
});
// Define the main banner schema
const bannerSchema = new mongoose_1.Schema({
    offerBanners: [bannerItemSchema], // Array of offer banners
    welcomeBanners: [bannerItemSchema], // Array of welcome banners
    collectionBanners: [bannerItemSchema], // Array of collection banners (new)
}, {
    timestamps: true // Automatically adds createdAt and updatedAt timestamps
});
// Create the Banner model
exports.BannerModel = mongoose_1.default.model("Banner", bannerSchema);
//# sourceMappingURL=bannerModel.js.map