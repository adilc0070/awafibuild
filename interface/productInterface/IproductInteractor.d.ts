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
import { ProductDTO, ProductCreationDTO } from "../../domain/dtos/ProductDTO";
import { responseHandler } from '../../types/commonTypes';
import { ProductResponseDTO } from '../../types/productTypes';
export default interface IProductInteractor {
    addProduct(data: ProductCreationDTO): Promise<ProductDTO | responseHandler>;
    bulkDownload(): Promise<any>;
    addBulkProduct(data: any): Promise<any>;
<<<<<<< HEAD
    fetchByCategoryAndName(page: number, limit: number, filter: any, userId?: mongoose.Types.ObjectId | null): Promise<ProductResponseDTO>;
    listProductsBySubcategories(page: number, limit: number, mainCatId: mongoose.Types.ObjectId, userId?: mongoose.Types.ObjectId | null): Promise<any>;
    listProductsByMaincategories(page: number, limit: number, mainCatId: mongoose.Types.ObjectId, userId?: mongoose.Types.ObjectId | null): Promise<any>;
    getAllProducts(page: number, limit: number): Promise<ProductResponseDTO>;
    getAllListedProducts(page: number, limit: number, userId?: mongoose.Types.ObjectId | null): Promise<ProductResponseDTO>;
    SearchByName(page: number, limit: number, name: string): Promise<ProductResponseDTO>;
    getProductById(id: mongoose.Types.ObjectId, userId?: mongoose.Types.ObjectId | null): Promise<ProductDTO | null>;
=======
    fetchByCategoryAndName(page: number, limit: number, filter: any, userId?: string | null): Promise<ProductResponseDTO>;
    listProductsBySubcategories(page: number, limit: number, mainCatId: mongoose.Types.ObjectId, userId?: string | null): Promise<any>;
    getAllProducts(page: number, limit: number): Promise<ProductResponseDTO>;
    getAllListedProducts(page: number, limit: number, userId?: string | null): Promise<ProductResponseDTO>;
    SearchByName(page: number, limit: number, name: string): Promise<ProductResponseDTO>;
    getProductById(id: mongoose.Types.ObjectId, userId?: string | null): Promise<ProductDTO | null>;
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
    updateProduct(id: mongoose.Types.ObjectId, data: Partial<ProductCreationDTO>): Promise<ProductDTO | null | responseHandler>;
    deleteProduct(id: mongoose.Types.ObjectId): Promise<boolean>;
    listById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>;
    unListById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>;
    updateImage(id: mongoose.Types.ObjectId, index: number, file: string): Promise<any>;
}
