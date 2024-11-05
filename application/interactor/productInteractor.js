"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInteractor = void 0;
class ProductInteractor {
    productRepo;
    cloudinaryService;
    excelService;
    categoryRepo;
    subCategoryRepo;
    constructor(productRepo, cloudinaryService, excelService, categoryRepo, subCategoryRepo) {
        this.productRepo = productRepo;
        this.cloudinaryService = cloudinaryService;
        this.excelService = excelService;
        this.categoryRepo = categoryRepo;
        this.subCategoryRepo = subCategoryRepo;
    }
    // Adding a new product
    async addProduct(productData) {
        const uploadedImages = await Promise.all(productData.images.map(async (path) => {
            const uploadResult = await this.cloudinaryService.uploadProductImage(path);
            return uploadResult.secure_url; // Return the Cloudinary URL
        }));
        productData.images = uploadedImages;
        const { name } = productData;
        const isAvailable = await this.productRepo.findByName(name);
        if (isAvailable) {
            return { message: "Product is already in your bucket", status: 409 };
        }
        const createdProduct = await this.productRepo.addProduct(productData);
        return this.mapEntityToDto(createdProduct);
    }
    async addBulkProduct(productData) {
        try {
            const sheetData = await this.excelService.processExcel(productData.path);
            if (sheetData && Array.isArray(sheetData)) {
                const addBulkProducts = sheetData.map(async (element) => {
                    try {
                        if (!element.name) {
                            return { status: 'failed', message: `Product entry is missing the "name" field.` };
                        }
                        // Check if the product already exists by name
                        const existingProduct = await this.productRepo.findByName(element.name);
                        if (existingProduct) {
                            // Check if the variant exists within the product
                            const existingVariant = existingProduct.variants.find((v) => v.weight === element.variantWeight);
                            if (existingVariant) {
                                // Update existing variant data
                                existingVariant.inPrice = element.variantInPrice;
                                existingVariant.outPrice = element.variantOutPrice;
                                existingVariant.stockQuantity = element.variantStockQuantity;
                                await existingProduct.save();
                                return {
                                    status: 'failed',
                                    message: `Product "${element.name}" with variant weight "${element.variantWeight}" already exists and was updated.`,
                                };
                            }
                            else {
                                // Add new variant if it doesn't exist in the product
                                existingProduct.variants.push({
                                    weight: element.variantWeight,
                                    inPrice: element.variantInPrice,
                                    outPrice: element.variantOutPrice,
                                    stockQuantity: element.variantStockQuantity,
                                });
                                await existingProduct.save();
                                return {
                                    status: 'success',
                                    message: `New variant for product "${element.name}" added successfully.`,
                                };
                            }
                        }
                        else {
                            // If the product doesn't exist, create a new one
                            // Associate Main and Subcategory IDs if present
                            if (element.MainCategory) {
                                const mainCategory = await this.categoryRepo.findByName(element.MainCategory);
                                element.MainCategory = mainCategory ? mainCategory._id : null;
                                if (element.SubCategory && mainCategory) {
                                    const subCategory = await this.subCategoryRepo.findByName(element.SubCategory);
                                    element.SubCategory = subCategory ? subCategory._id : null;
                                }
                                else {
                                    element.SubCategory = null;
                                }
                            }
                            // Add new product
                            await this.productRepo.addBulkProduct(element);
                            return { status: 'success', message: `Product "${element.name}" added successfully.` };
                        }
                    }
                    catch (error) {
                        return {
                            status: 'failed',
                            message: `Failed to process product "${element.name}": ${error.message}`,
                        };
                    }
                });
                const results = await Promise.allSettled(addBulkProducts);
                const successMessages = results
                    .filter((result) => result.status === 'fulfilled' && result.value.status === 'success')
                    .map((result) => result.value.message);
                const failedMessages = results
                    .filter((result) => result.status === 'fulfilled' && result.value.status === 'failed')
                    .map((result) => result.value.message);
                return {
                    message: 'Bulk product processing completed',
                    successCount: successMessages.length,
                    failedCount: failedMessages.length,
                    successMessages,
                    failedMessages,
                };
            }
            else {
                return { message: 'Invalid sheet data format', data: sheetData };
            }
        }
        catch (error) {
            console.error('Error processing bulk products:', error);
            throw new Error('Failed to add bulk products');
        }
    }
    async bulkDownload() {
        const ProductResponse = await this.productRepo.findAllProductsInJsonWithAggregation();
        if (ProductResponse.products) {
            console.log("product data sets", ProductResponse.products);
            const excelBuffer = await this.excelService.createExcelBuffer(ProductResponse.products);
            return excelBuffer;
        }
    }
    async updateImage(id, index, path) {
        const uploadResult = await this.cloudinaryService.uploadProductImage(path);
        const updatedProduct = await this.productRepo.updateImage(id, index, uploadResult.secure_url);
        return updatedProduct.modifiedCount > 0 ? uploadResult.secure_url : false;
    }
    // Retrieve all products
    async getAllProducts(page, limit) {
        const ProductResponse = await this.productRepo.findAllProducts(page, limit);
        const products = ProductResponse.products.map((p) => this.mapEntityToDto(p));
        return { products: products, totalPages: ProductResponse.totalPages };
    }
    // Retrieve all listed products
    async getAllListedProducts(page, limit) {
        const ProductResponse = await this.productRepo.findListedAllProducts(page, limit);
        const products = ProductResponse.products.map((p) => this.mapEntityToDto(p));
        return { products: products, totalPages: ProductResponse.totalPages };
    }
    async SearchByName(page, limit, productName) {
        const ProductResponse = await this.productRepo.findProductsBySpelling(page, limit, productName);
        const products = ProductResponse.products.map((p) => this.mapEntityToDto(p));
        return { products: products, totalPages: ProductResponse.totalPages };
    }
    // Filter by category
    async fetchByCategoryAndName(page, limit, filter) {
        const ProductResponse = await this.productRepo.fetchByCategoryAndName(page, limit, filter);
        const products = ProductResponse.products.map((p) => this.mapEntityToDto(p));
        return { products: products, totalPages: ProductResponse.totalPages };
    }
    // liste products under sub category using maincategory id------
    async listProductsBySubcategories(page, limit, mainCatId) {
        const products = await this.productRepo.listProductsBySubcategories(page, limit, mainCatId);
        return products;
    }
    // Retrieve a product by ID
    async getProductById(id) {
        const product = await this.productRepo.productFindById(id);
        return product ? this.mapEntityToDto(product) : null;
    }
    // Update a product by ID
    async updateProduct(id, data) {
        if (data?.name) {
            const isAvailable = await this.productRepo.findByNameAndNotCurrentId(id, data.name);
            if (isAvailable) {
                return { message: "Product name is already in your bucket", status: 409 };
            }
        }
        const updatedProduct = await this.productRepo.updateProduct(id, data);
        return updatedProduct ? this.mapEntityToDto(updatedProduct) : null;
    }
    // List and unlist product
    async listById(id) {
        const isListed = await this.productRepo.isListedProduct(id);
        if (isListed) {
            throw new Error("Product is already listed");
        }
        const listProduct = await this.productRepo.updateListing(id, { isListed: true });
        return listProduct.modifiedCount > 0 ? { message: "Product listed" } : null;
    }
    async unListById(id) {
        const isListed = await this.productRepo.isListedProduct(id);
        if (!isListed) {
            throw new Error("Product is already unlisted");
        }
        const unlistProduct = await this.productRepo.updateListing(id, { isListed: false });
        return unlistProduct.modifiedCount > 0 ? { message: "Product is unlisted" } : null;
    }
    // Delete a product by ID
    async deleteProduct(id) {
        const deletedProduct = await this.productRepo.deleteProduct(id);
        return !!deletedProduct;
    }
    // Mapping Product entity to DTO
    mapEntityToDto(product) {
        return {
            _id: product._id, // Use the hashed ID here
            name: product.name,
            descriptions: product.descriptions,
            category: product.category,
            subCategory: product.subCategory,
            images: product.images,
            variants: product.variants,
            isListed: product.isListed,
            ean: product.ean,
            sku: product.sku,
        };
    }
}
exports.ProductInteractor = ProductInteractor;
//# sourceMappingURL=productInteractor.js.map