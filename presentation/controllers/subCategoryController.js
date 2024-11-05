"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryController = void 0;
const mongoose_1 = __importDefault(require("mongoose")); // Import mongoose for ObjectId conversion
class SubCategoryController {
    categoryInteractor; // Use the interface type
    constructor(categoryInteractor) {
        this.categoryInteractor = categoryInteractor;
    }
    // Add a new category (HTTP POST)
    async addCategory(req, res, next) {
        try {
            const category = req.body;
            const result = await this.categoryInteractor.addCategory(category);
            if (result?.status) {
                res.status(result.status).json({ message: result.message });
            }
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    // Get all categories (HTTP GET)
    async getAllCategories(req, res, next) {
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const categories = await this.categoryInteractor.getAllCategories(page, limit);
            res.status(200).json(categories);
        }
        catch (error) {
            next(error);
        }
    }
    async searchBySubCategoryName(req, res, next) {
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const name = req.query.searchName ? req.query.searchName.toString() : '';
            const categories = await this.categoryInteractor.searchByname(page, limit, name);
            res.status(200).json(categories);
        }
        catch (error) {
            next(error);
        }
    }
    async getListedCategories(req, res, next) {
        try {
            const { mainCategoryid } = req.params;
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            // Check if mainCategoryId is provided, and convert it to ObjectId
            if (!mainCategoryid) {
                res.status(400).json({ message: "mainCategoryId is required" });
            }
            const categoryId = new mongoose_1.default.Types.ObjectId(mainCategoryid);
            const products = await this.categoryInteractor.getListedCategories(categoryId, page, limit);
            res.status(200).json(products);
        }
        catch (error) {
            next(error);
        }
    }
    // Get a category by ID (HTTP GET)
    async getCategoryById(req, res, next) {
        try {
            const categoryId = new mongoose_1.default.Types.ObjectId(req.params.id); // Convert string to ObjectId
            const product = await this.categoryInteractor.getCategoryById(categoryId);
            if (product) {
                res.status(200).json(product);
            }
            else {
                res.status(404).json({ message: "Category not found" });
            }
        }
        catch (error) {
            next(error);
        }
    }
    // Update a category (HTTP PUT)
    async updateCategory(req, res, next) {
        try {
            const productId = new mongoose_1.default.Types.ObjectId(req.params.id); // Convert string to ObjectId
            const updatedData = req.body;
            const updatedProduct = await this.categoryInteractor.updateCategory(productId, updatedData);
            if (updatedProduct) {
                res.status(200).json(updatedProduct);
            }
            else {
                res.status(404).json({ message: "Category not found" });
            }
        }
        catch (error) {
            next(error);
        }
    }
    // Toggle listing status of a category (HTTP PUT)
    async toggleListStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { action } = req.query; // Action can be 'list' or 'unlist'
            if (typeof action !== 'string' || (action !== 'list' && action !== 'unlist')) {
                throw new Error('Invalid action. Expected "list" or "unlist".');
            }
            const productId = new mongoose_1.default.Types.ObjectId(id); // Convert string to ObjectId
            let product;
            if (action === 'list') {
                product = await this.categoryInteractor.listById(productId);
            }
            else if (action === 'unlist') {
                product = await this.categoryInteractor.unListById(productId);
            }
            res.status(200).json(product);
        }
        catch (error) {
            next(error);
        }
    }
    // Delete a category (HTTP DELETE)
    async deleteCategory(req, res, next) {
        try {
            const productId = new mongoose_1.default.Types.ObjectId(req.params.id); // Convert string to ObjectId
            const deleted = await this.categoryInteractor.deleteCategory(productId);
            if (deleted) {
                res.status(200).json({ message: "Category deleted successfully" });
            }
            else {
                res.status(404).json({ message: "Category not found" });
            }
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SubCategoryController = SubCategoryController;
//# sourceMappingURL=subCategoryController.js.map