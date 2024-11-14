import { ProductCreationDTO, Variant } from "../../domain/dtos/ProductDTO";
import mongoose, { Model } from "mongoose";
import IProductSchema from "../../domain/entities/productSchema";
import { BaseRepository } from "./baseRepository";
import { IproductRepo } from "../../interface/productInterface/IproductRepo";
import { ProductResponse } from "../../types/productTypes";
type listing = {
    isListed: boolean;
};
export declare class ProductRepository extends BaseRepository<IProductSchema> implements IproductRepo {
    constructor(model: Model<IProductSchema>);
    addProduct(productDTO: ProductCreationDTO): Promise<IProductSchema>;
    addBulkProduct(productData: any): Promise<any>;
    findAllProducts(page: number, limit: number): Promise<ProductResponse>;
    findAllProductsInJsonWithAggregation(): Promise<ProductResponse>;
    findProductsBySpelling(page: number, limit: number, name: string): Promise<ProductResponse>;
    findByName(name: string): Promise<IProductSchema | null>;
    findByIdAndVariantId(productId: mongoose.Types.ObjectId, variantId: mongoose.Types.ObjectId): Promise<IProductSchema | null>;
    findByNameAndVariant(query: {
        name: string;
        weight: string;
    }): Promise<boolean>;
    findByNameAndNotCurrentId(id: mongoose.Types.ObjectId, name: string): Promise<IProductSchema | null>;
    isListedProduct(id: mongoose.Types.ObjectId): Promise<IProductSchema | null>;
    updateListing(id: mongoose.Types.ObjectId, UpdateQuery: listing): Promise<any | null>;
    updateImage(id: mongoose.Types.ObjectId, index: number, photo: string): Promise<any | null>;
    updateVariantQuantity(productId: mongoose.Types.ObjectId, variantId: string, quantity: number): Promise<IProductSchema | null>;
    updateProduct(id: mongoose.Types.ObjectId, data: Partial<ProductCreationDTO> | Variant): Promise<IProductSchema | null>;
    deleteProduct(id: mongoose.Types.ObjectId): Promise<boolean>;
    findListedAllProducts(page: number, limit: number, userId?: mongoose.Types.ObjectId | null): Promise<ProductResponse>;
    fetchByCategoryAndName(page: number, limit: number, filter: any, userId?: mongoose.Types.ObjectId | null): Promise<ProductResponse>;
    productFindById(id: mongoose.Types.ObjectId, userId?: mongoose.Types.ObjectId | null): Promise<IProductSchema | null>;
    listProductsBySubcategories(page: number, limit: number, subCategoryId: mongoose.Types.ObjectId, userId?: mongoose.Types.ObjectId | null): Promise<any>;
    listProductsBySubcategoriesUsingMainCategory(page: number, limit: number, mainCatId: mongoose.Types.ObjectId, userId?: mongoose.Types.ObjectId | null): Promise<any>;
}
export {};
