"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/presentation/routes/subCategoryRoutes.ts
const express_1 = __importDefault(require("express"));
const subCategoryRepository_1 = require("../../infrastructure/repositories/subCategoryRepository");
const subCategoryModel_1 = __importDefault(require("../../infrastructure/model/subCategoryModel"));
const subCategoryInteractor_1 = require("../../application/interactor/subCategoryInteractor");
const subCategoryController_1 = require("../controllers/subCategoryController");
const adminAuthMiddleware_1 = require("../middleware/adminAuthMiddleware");
// Set up dependencies
const subCategoryRepo = new subCategoryRepository_1.SubCategoryRepository(subCategoryModel_1.default);
const subCategoryInteractor = new subCategoryInteractor_1.SubCategoryInteractor(subCategoryRepo);
const subCategoryController = new subCategoryController_1.SubCategoryController(subCategoryInteractor);
const subCategoryRoutes = express_1.default.Router();
// Subcategory Admin Routes
subCategoryRoutes.post("/category/sub/admin", adminAuthMiddleware_1.verifyAdminToken, subCategoryController.addCategory.bind(subCategoryController));
subCategoryRoutes.get("/category/sub/admin", adminAuthMiddleware_1.verifyAdminToken, subCategoryController.getAllCategories.bind(subCategoryController));
subCategoryRoutes.get("/category/search/sub/admin", adminAuthMiddleware_1.verifyAdminToken, subCategoryController.searchBySubCategoryName.bind(subCategoryController));
subCategoryRoutes.get("/listedCategory/sub/admin/:mainCategoryid", adminAuthMiddleware_1.verifyAdminToken, subCategoryController.getListedCategories.bind(subCategoryController));
subCategoryRoutes.get("/category/sub/admin/:id", adminAuthMiddleware_1.verifyAdminToken, subCategoryController.getCategoryById.bind(subCategoryController));
subCategoryRoutes.put("/category/sub/admin/:id", adminAuthMiddleware_1.verifyAdminToken, subCategoryController.updateCategory.bind(subCategoryController));
subCategoryRoutes.patch("/category/sub/admin/:id", adminAuthMiddleware_1.verifyAdminToken, subCategoryController.toggleListStatus.bind(subCategoryController));
subCategoryRoutes.patch("/category/sub/delete/admin/:id", adminAuthMiddleware_1.verifyAdminToken, subCategoryController.deleteCategory.bind(subCategoryController));
// Subcategory User Routes
subCategoryRoutes.get("/listedCategory/sub/:mainCategoryid", subCategoryController.getListedCategories.bind(subCategoryController));
subCategoryRoutes.get("/category/sub/:id", subCategoryController.getCategoryById.bind(subCategoryController));
exports.default = subCategoryRoutes;
//# sourceMappingURL=subCategoryRoute.js.map