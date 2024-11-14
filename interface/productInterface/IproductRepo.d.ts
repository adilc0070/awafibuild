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
import mongoose from "mongoose";
import { ProductCreationDTO, ProductDTO, Variant } from "../../domain/dtos/ProductDTO";
import Product from "../../domain/entities/productSchema";
import { ProductResponse } from '../../types/productTypes';
export interface IproductRepo {
    addProduct(productData: ProductCreationDTO): Promise<Product>;
    addBulkProduct(productData: any): Promise<void>;
    updateProduct(id: mongoose.Types.ObjectId, data: Partial<ProductCreationDTO> | Variant): Promise<Product | null>;
    findByName(name: string): Promise<Product | null>;
    findByNameAndVariant(query: {
        name: string;
        weight: string;
    }): Promise<boolean>;
    findByNameAndNotCurrentId(id: mongoose.Types.ObjectId, name: string): Promise<Product | null>;
    findAllProducts(page: number, limit: number): Promise<ProductResponse>;
    findAllProductsInJsonWithAggregation(): Promise<ProductResponse>;
<<<<<<< HEAD
    findListedAllProducts(page: number, limit: number, userId?: mongoose.Types.ObjectId | null): Promise<ProductResponse>;
=======
    findListedAllProducts(page: number, limit: number, userId?: string | null): Promise<ProductResponse>;
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
    findProductsBySpelling(page: number, limit: number, name: string): Promise<ProductResponse>;
    productFindById(id: mongoose.Types.ObjectId, userId?: mongoose.Types.ObjectId | null): Promise<Product | null>;
    findByIdAndVariantId(productId: mongoose.Types.ObjectId, variantId: mongoose.Types.ObjectId | null): Promise<Product | null>;
    fetchByCategoryAndName(page: number, limit: number, filter: any, userId?: mongoose.Types.ObjectId | null): Promise<ProductResponse>;
    listProductsBySubcategoriesUsingMainCategory(page: number, limit: number, mainCatId: mongoose.Types.ObjectId, userId?: mongoose.Types.ObjectId | null): Promise<ProductDTO[] | null>;
    listProductsBySubcategories(page: number, limit: number, mainCatId: mongoose.Types.ObjectId, userId?: mongoose.Types.ObjectId | null): Promise<ProductDTO[] | null>;
    updateImage(id: mongoose.Types.ObjectId, index: number, imageUrl: string): Promise<{
        modifiedCount: number;
    }>;
    deleteProduct(id: mongoose.Types.ObjectId): Promise<boolean>;
    updateListing(id: mongoose.Types.ObjectId, data: {
        isListed: boolean;
    }): Promise<{
        modifiedCount: number;
    }>;
    isListedProduct(id: mongoose.Types.ObjectId): Promise<Product | null>;
}
