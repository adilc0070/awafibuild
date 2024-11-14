"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/ProductRoutes.ts
const express_1 = __importDefault(require("express"));
const productRepository_1 = require("../../infrastructure/repositories/productRepository");
const productController_1 = require("../controllers/productController");
const productInteractor_1 = require("../../application/interactor/productInteractor");
const producModel_1 = require("../../infrastructure/model/producModel");
const multerConfig_1 = require("../../config/multerConfig");
const cloudinaryService_1 = __importDefault(require("../../application/services/cloudinaryService"));
const excelService_1 = require("../../application/services/excelService");
const categoryRepository_1 = require("../../infrastructure/repositories/categoryRepository");
const categoryModel_1 = __importDefault(require("../../infrastructure/model/categoryModel"));
const subCategoryModel_1 = __importDefault(require("../../infrastructure/model/subCategoryModel"));
const subCategoryRepository_1 = require("../../infrastructure/repositories/subCategoryRepository");
const OptionalAuth_1 = require("../middleware/OptionalAuth");
const productRepo = new productRepository_1.ProductRepository(producModel_1.ProductModel);
const categoryRepo = new categoryRepository_1.CategoryRepository(categoryModel_1.default);
const subCategoryRepo = new subCategoryRepository_1.SubCategoryRepository(subCategoryModel_1.default);
const cloudinaryService = new cloudinaryService_1.default();
const excelService = new excelService_1.ExcelService();
const productInteractor = new productInteractor_1.ProductInteractor(productRepo, cloudinaryService, excelService, categoryRepo, subCategoryRepo);
const productController = new productController_1.ProductController(productInteractor);
const productRoutes = express_1.default.Router();
// Admin product routes
productRoutes.get("/product/listed/admin", productController.getAllListedProducts.bind(productController));
productRoutes.put("/product/admin/:id", productController.updateProduct.bind(productController));
productRoutes.get("/product/admin/:id", productController.getProductById.bind(productController));
productRoutes.get("/product/search/admin", productController.SearchByName.bind(productController));
productRoutes.post("/product/bulk/upload/admin", multerConfig_1.uploadExcel.single("file"), productController.bulkAdding.bind(productController));
productRoutes.get("/product/bulk/download/admin", productController.bulkDownload.bind(productController));
productRoutes.post("/product/admin", multerConfig_1.uploadImages.array("images", 5), productController.addProduct.bind(productController));
productRoutes.patch("/product/update-img/admin", multerConfig_1.uploadImages.single("image"), productController.updateImage.bind(productController));
productRoutes.get("/product/admin", productController.getAllProducts.bind(productController));
productRoutes.patch("/product/list-status/admin/:id", productController.toggleListStatus.bind(productController));
productRoutes.patch("/product/delete/admin/:id", productController.deleteProduct.bind(productController));
productRoutes.put("/product/:id", productController.updateProduct.bind(productController));
// User product routes
productRoutes.get("/product/filter", OptionalAuth_1.optionalAuth, productController.FilterProductsForUser.bind(productController));
productRoutes.get("/product/listed", OptionalAuth_1.optionalAuth, productController.getAllListedProductsForUser.bind(productController));
productRoutes.get("/product/subCategory/:subCatId", OptionalAuth_1.optionalAuth, productController.listProductsBySubCategoryForUser.bind(productController));
productRoutes.get("/product/:id", OptionalAuth_1.optionalAuth, productController.getProductByIdForUser.bind(productController));
productRoutes.get("/product/mainCategory/:mainCatId", OptionalAuth_1.optionalAuth, productController.listProductsByMainCategoryForUser.bind(productController));
exports.default = productRoutes;
//# sourceMappingURL=productRoute.js.map