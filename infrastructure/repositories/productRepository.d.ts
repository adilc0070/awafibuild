/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
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
<<<<<<< HEAD
=======
    findListedAllProducts(page: number, limit: number, userId?: string | null): Promise<ProductResponse>;
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
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
