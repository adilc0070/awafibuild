"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class ProductController {
    productInteractor;
    constructor(productInteractor) {
        this.productInteractor = productInteractor;
    }
    // Add a new product (HTTP POST)
    async addProduct(req, res, next) {
        try {
            const photos = req.files || [];
            const productData = req.body;
            if (photos.length > 0 && !productData.images) {
                productData.images = photos.map((photo) => photo.path.toString());
            }
            const result = await this.productInteractor.addProduct(productData);
            if (result?.status) {
                res.status(result.status).json({ message: result.message });
            }
            else {
                res
                    .status(200)
                    .json({ message: "Product created successfully", product: result });
            }
        }
        catch (error) {
            next(error);
        }
    }
    async bulkAdding(req, res, next) {
        try {
            const productData = req.file || [];
            const result = await this.productInteractor.addBulkProduct(productData);
            if (result?.status) {
                res.status(result.status).json({ message: result.message });
            }
            else {
                res
                    .status(200)
                    .json({ message: "Product created successfully", product: result });
            }
        }
        catch (error) {
            next(error);
        }
    }
    async bulkDownload(req, res, next) {
        try {
            // const page = req.query.page ? Number(req.query.page) : 1;
            // const limit = req.query.limit ? Number(req.query.limit) : 10;
            const products = await this.productInteractor.bulkDownload();
            if (products) {
                res.set({
                    'Content-Disposition': 'attachment; filename="data.xlsx"',
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                });
                res.send(products);
            }
        }
        catch (error) {
            next(error);
        }
    }
    // Update single image
    async updateImage(req, res, next) {
        try {
            const { productId, index } = req.query;
            if (!req.file) {
                throw new Error("Photo is not provided");
            }
            const { path } = req.file;
            if (typeof productId !== "string" || typeof index !== "string") {
                throw new Error("Invalid productId or index");
            }
            const currentIndex = parseInt(index, 10);
            if (isNaN(currentIndex)) {
                throw new Error("Index must be a valid number");
            }
            const productObjectId = new mongoose_1.default.Types.ObjectId(productId);
            const products = await this.productInteractor.updateImage(productObjectId, currentIndex, path);
            res.status(200).json(products);
        }
        catch (error) {
            next(error);
        }
    }
    // Get all products (HTTP GET)
    async getAllProducts(req, res, next) {
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const products = await this.productInteractor.getAllProducts(page, limit);
            res.status(200).json(products);
        }
        catch (error) {
            next(error);
        }
    }
    // Get all listed products (HTTP GET)
    async getAllListedProducts(req, res, next) {
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const products = await this.productInteractor.getAllListedProducts(page, limit);
            res.status(200).json(products);
        }
        catch (error) {
            next(error);
        }
    }
    async SearchByName(req, res, next) {
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const name = req.query.searchName ? req.query.searchName.toString() : '';
            const products = await this.productInteractor.SearchByName(page, limit, name);
            res.status(200).json(products);
        }
        catch (error) {
            next(error);
        }
    }
    // Fetch products by category
    async FilterProducts(req, res, next) {
        try {
            const { mainCategoryId, subCategoryId, name } = req.body;
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const MainCategoryId = mainCategoryId
                ? new mongoose_1.default.Types.ObjectId(mainCategoryId)
                : null;
            const SubCategoryId = subCategoryId
                ? new mongoose_1.default.Types.ObjectId(subCategoryId)
                : null;
            const prodctname = name ? name : null;
            const filter = {
                MainCategoryId,
                SubCategoryId,
                prodctname
            };
            const products = await this.productInteractor.fetchByCategoryAndName(page, limit, filter);
            res.status(200).json(products);
        }
        catch (error) {
            next(error);
        }
    }
    // Get a product by ID (HTTP GET)
    async getProductById(req, res, next) {
        try {
            const productId = new mongoose_1.default.Types.ObjectId(req.params.id);
            const product = await this.productInteractor.getProductById(productId);
            if (product) {
                res.status(200).json(product);
            }
            else {
                res.status(404).json({ message: "Product not found" });
            }
        }
        catch (error) {
            next(error);
        }
    }
    // Update a product (HTTP PUT)
    async updateProduct(req, res, next) {
        try {
            const productId = new mongoose_1.default.Types.ObjectId(req.params.id);
            const updatedData = req.body;
            const updatedProduct = await this.productInteractor.updateProduct(productId, updatedData);
            if (updatedProduct?.status) {
                res
                    .status(updatedProduct.status)
                    .json({ message: updatedProduct.message });
            }
            else if (updatedProduct) {
                res.status(200).json(updatedProduct);
            }
            else {
                res.status(404).json({ message: "Product not found" });
            }
        }
        catch (error) {
            next(error);
        }
    }
    // List or unlist a product
    async toggleListStatus(req, res, next) {
        try {
            const id = new mongoose_1.default.Types.ObjectId(req.params.id);
            const { action } = req.query; // action can be 'list' or 'unlist'
            if (typeof action !== "string" ||
                (action !== "list" && action !== "unlist")) {
                throw new Error('Invalid action. Expected "list" or "unlist".');
            }
            let product;
            if (action === "list") {
                product = await this.productInteractor.listById(id);
            }
            else if (action === "unlist") {
                product = await this.productInteractor.unListById(id);
            }
            res.status(200).json(product);
        }
        catch (error) {
            next(error);
        }
    }
    // Delete a product (HTTP DELETE)
    async deleteProduct(req, res, next) {
        try {
            const productId = new mongoose_1.default.Types.ObjectId(req.params.id);
            const deleted = await this.productInteractor.deleteProduct(productId);
            if (deleted) {
                res.status(200).json({ message: "Product deleted successfully" });
            }
            else {
                res.status(404).json({ message: "Product not found" });
            }
        }
        catch (error) {
            next(error);
        }
    }
    // --------------------------------------------// User product controllers------------------------------------------------
    async getAllListedProductsForUser(req, res, next) {
        try {
<<<<<<< HEAD
            const userId = req.user?.id ? new mongoose_1.default.Types.ObjectId(req.user.id) : null;
=======
            const userId = req.user?.id || null;
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const products = await this.productInteractor.getAllListedProducts(page, limit, userId);
            res.status(200).json(products);
        }
        catch (error) {
            next(error);
        }
    }
    // Get a product by ID (HTTP GET)
    async getProductByIdForUser(req, res, next) {
        try {
<<<<<<< HEAD
            const userId = req.user?.id ? new mongoose_1.default.Types.ObjectId(req.user.id) : null;
=======
            const userId = req.user?.id || null;
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
            const productId = new mongoose_1.default.Types.ObjectId(req.params.id);
            const product = await this.productInteractor.getProductById(productId, userId);
            if (product) {
                res.status(200).json(product);
            }
            else {
                res.status(404).json({ message: "Product not found" });
            }
        }
        catch (error) {
            next(error);
        }
    }
    // Fetching products under subcategory using main category id
<<<<<<< HEAD
    async listProductsByMainCategoryForUser(req, res, next) {
        try {
            const userId = req.user?.id ? new mongoose_1.default.Types.ObjectId(req.user.id) : null;
=======
    async listProductsBySubcategoriesForUser(req, res, next) {
        try {
            const userId = req.user?.id || null;
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
            const { mainCatId } = req.params;
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            if (!mainCatId) {
                res.status(400).json({ error: "Main category ID is required" });
<<<<<<< HEAD
                return;
            }
            const MainCategoryId = new mongoose_1.default.Types.ObjectId(mainCatId);
            const products = await this.productInteractor.listProductsByMaincategories(page, limit, MainCategoryId, userId);
            res.status(200).json(products);
        }
        catch (error) {
            next(error);
        }
    }
    async listProductsBySubCategoryForUser(req, res, next) {
        try {
            const userId = req.user?.id ? new mongoose_1.default.Types.ObjectId(req.user.id) : null;
            const { subCatId } = req.params;
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            if (!subCatId) {
                res.status(400).json({ error: "Sub category ID is required" });
                return;
            }
            const MainCategoryId = new mongoose_1.default.Types.ObjectId(subCatId);
=======
            }
            const MainCategoryId = new mongoose_1.default.Types.ObjectId(mainCatId);
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
            const products = await this.productInteractor.listProductsBySubcategories(page, limit, MainCategoryId, userId);
            res.status(200).json(products);
        }
        catch (error) {
            next(error);
        }
    }
    async FilterProductsForUser(req, res, next) {
        try {
<<<<<<< HEAD
            const userId = req.user?.id ? new mongoose_1.default.Types.ObjectId(req.user.id) : null;
=======
            const userId = req.user?.id || null;
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
            const { mainCategoryId, subCategoryId, name } = req.body;
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const MainCategoryId = mainCategoryId
                ? new mongoose_1.default.Types.ObjectId(mainCategoryId)
                : null;
            const SubCategoryId = subCategoryId
                ? new mongoose_1.default.Types.ObjectId(subCategoryId)
                : null;
<<<<<<< HEAD
            const productName = name ? name : null;
            const filter = {
                MainCategoryId,
                SubCategoryId,
                productName
=======
            const prodctname = name ? name : null;
            const filter = {
                MainCategoryId,
                SubCategoryId,
                prodctname
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
            };
            const products = await this.productInteractor.fetchByCategoryAndName(page, limit, filter, userId);
            res.status(200).json(products);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=productController.js.map