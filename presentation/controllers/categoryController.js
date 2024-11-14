"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const mongoose_1 = __importDefault(require("mongoose")); // Add mongoose for ObjectId
class CategoryController {
    categoryInteractor; // Use the interface type
    constructor(categoryInteractor) {
        this.categoryInteractor = categoryInteractor;
    }
    // Add a new category (HTTP POST)
    async addCategory(req, res, next) {
        try {
            const category = req.body;
            const photo = req.file;
            if (photo && typeof photo.path == "string") {
                category.photo = photo.path;
            }
            const result = await this.categoryInteractor.addCategory(category);
            if (result?.status) {
                res.status(result.status).json({ message: result.message });
            }
            else {
                res.status(200).json(result);
            }
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
            const products = await this.categoryInteractor.getAllCategories(page, limit);
            res.status(200).json(products);
        }
        catch (error) {
            next(error);
        }
    }
    async searchByCategoryName(req, res, next) {
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const name = req.query.searchName ? req.query.searchName.toString() : '';
            const products = await this.categoryInteractor.getByName(page, limit, name);
            res.status(200).json(products);
        }
        catch (error) {
            next(error);
        }
    }
    // Get listed categories (HTTP GET)
    async getListedCategories(req, res, next) {
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const products = await this.categoryInteractor.getListedCategories(page, limit);
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
            const category = await this.categoryInteractor.getCategoryById(categoryId);
            if (category) {
                res.status(200).json(category);
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
            const categoryId = new mongoose_1.default.Types.ObjectId(req.params.id); // Convert string to ObjectId
            const updatedData = req.body;
            const photo = req.file;
            if (photo && typeof photo.path == "string") {
                updatedData.photo = photo.path;
            }
            const updatedCategory = await this.categoryInteractor.updateCategory(categoryId, updatedData);
            if (updatedCategory) {
                res.status(200).json(updatedCategory);
            }
            else {
                res.status(404).json({ message: "Category not found" });
            }
        }
        catch (error) {
            next(error);
        }
    }
    // Toggle list status of a category (HTTP PUT)
    async toggleListStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { action } = req.query;
            if (typeof action !== 'string' || (action !== 'list' && action !== 'unlist')) {
                throw new Error('Invalid action. Expected "list" or "unlist".');
            }
            const categoryId = new mongoose_1.default.Types.ObjectId(id); // Convert string to ObjectId
            let category;
            if (action === 'list') {
                category = await this.categoryInteractor.listById(categoryId);
            }
            else if (action === 'unlist') {
                category = await this.categoryInteractor.unListById(categoryId);
            }
            res.status(200).json(category);
        }
        catch (error) {
            next(error);
        }
    }
    // Delete a category (HTTP DELETE)
    async deleteCategory(req, res, next) {
        try {
            const categoryId = new mongoose_1.default.Types.ObjectId(req.params.id); // Convert string to ObjectId
            const deleted = await this.categoryInteractor.deleteCategory(categoryId);
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
exports.CategoryController = CategoryController;
//# sourceMappingURL=categoryController.js.map