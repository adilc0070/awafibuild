"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("../../config/cloudinary");
const fs_1 = require("fs");
class CloudinaryService {
    uploader;
    constructor() {
        this.uploader = cloudinary_1.uploader;
    }
    // Uploads a product image to the 'ProductImages' folder
    async uploadProductImage(filePath) {
        try {
            const result = await this.uploader.upload(filePath, {
                folder: 'ProductImages',
                resource_type: 'auto', // Automatically detects the file type
            });
            // Remove the image from local storage after successful upload
            await fs_1.promises.unlink(filePath);
            return result;
        }
        catch (error) {
            throw new Error(`Failed to upload image: ${error.message}`);
        }
    }
    //uploadofferBanner
    async uploadOfferBaner(filePath) {
        try {
            const result = await this.uploader.upload(filePath, {
                folder: 'offerBanner',
                resource_type: 'auto', // Automatically detects the file type
            });
            // Remove the image from local storage after successful upload
            await fs_1.promises.unlink(filePath);
            return result;
        }
        catch (error) {
            throw new Error(`Failed to upload image: ${error.message}`);
        }
    }
    async uploadCategoryImage(filePath) {
        try {
            const result = await this.uploader.upload(filePath, {
                folder: 'CategoryImages',
                resource_type: 'auto', // Automatically detects the file type
            });
            // Remove the image from local storage after successful upload
            await fs_1.promises.unlink(filePath);
            return result;
        }
        catch (error) {
            throw new Error(`Failed to upload image: ${error.message}`);
        }
    }
}
exports.default = CloudinaryService;
//# sourceMappingURL=cloudinary.js.map