"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/presentation/routes/categoryRoutes.ts
const express_1 = __importDefault(require("express"));
const categoryRepository_1 = require("../../infrastructure/repositories/categoryRepository");
const categoryController_1 = require("../controllers/categoryController");
const categoryInteractor_1 = require("../../application/interactor/categoryInteractor");
const categoryModel_1 = __importDefault(require("../../infrastructure/model/categoryModel"));
const multerConfig_1 = require("../../config/multerConfig");
const cloudinaryService_1 = __importDefault(require("../../application/services/cloudinaryService"));
const adminAuthMiddleware_1 = require("../middleware/adminAuthMiddleware");
// Set up dependencies
const categoryRepo = new categoryRepository_1.CategoryRepository(categoryModel_1.default);
const cloudinaryService = new cloudinaryService_1.default();
const categoryInteractor = new categoryInteractor_1.CategoryInteractor(categoryRepo, cloudinaryService);
const categoryController = new categoryController_1.CategoryController(categoryInteractor);
const categoryRoutes = express_1.default.Router();
// Main Category Admin Routes
categoryRoutes.post("/category/admin", adminAuthMiddleware_1.verifyAdminToken, multerConfig_1.uploadCategoryImage.single('photo'), categoryController.addCategory.bind(categoryController));
categoryRoutes.get("/category/admin", adminAuthMiddleware_1.verifyAdminToken, categoryController.getAllCategories.bind(categoryController));
categoryRoutes.get("/category/search/admin", adminAuthMiddleware_1.verifyAdminToken, categoryController.searchByCategoryName.bind(categoryController));
categoryRoutes.get("/listedCategory/admin", adminAuthMiddleware_1.verifyAdminToken, categoryController.getListedCategories.bind(categoryController));
categoryRoutes.get("/category/admin/:id", adminAuthMiddleware_1.verifyAdminToken, categoryController.getCategoryById.bind(categoryController));
categoryRoutes.put("/category/admin/:id", adminAuthMiddleware_1.verifyAdminToken, multerConfig_1.uploadCategoryImage.single('photo'), categoryController.updateCategory.bind(categoryController));
categoryRoutes.patch("/category/admin/:id", adminAuthMiddleware_1.verifyAdminToken, categoryController.toggleListStatus.bind(categoryController));
categoryRoutes.patch("/category/delete/admin/:id", adminAuthMiddleware_1.verifyAdminToken, categoryController.deleteCategory.bind(categoryController));
// Main Category User Routes
categoryRoutes.get("/category/:id", categoryController.getCategoryById.bind(categoryController));
categoryRoutes.get("/listedCategory", categoryController.getListedCategories.bind(categoryController));
exports.default = categoryRoutes;
//# sourceMappingURL=categoryRoute.js.map