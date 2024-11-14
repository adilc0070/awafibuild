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
import { ProductCreationDTO, ProductDTO } from "../../domain/dtos/ProductDTO";
import IProductInteractor from "../../interface/productInterface/IproductInteractor";
import { responseHandler } from '../../types/commonTypes';
import { ICloudinaryService } from "../../interface/serviceInterface/IcloudinaryInterface";
import { IproductRepo } from "../../interface/productInterface/IproductRepo";
import mongoose from "mongoose";
import { IExcel } from "../../interface/serviceInterface/IexcelInterface";
import { ProductResponseDTO } from "../../types/productTypes";
import ICategoryRepo from "../../interface/categoryInterface/IcategoryRepo";
import ISubCategoryRepo from "../../interface/subCategoryInterface/IsubCategoryRepo";
export declare class ProductInteractor implements IProductInteractor {
    private productRepo;
    private cloudinaryService;
    private excelService;
    private categoryRepo;
    private subCategoryRepo;
    constructor(productRepo: IproductRepo, cloudinaryService: ICloudinaryService, excelService: IExcel, categoryRepo: ICategoryRepo, subCategoryRepo: ISubCategoryRepo);
    addProduct(productData: ProductCreationDTO): Promise<ProductDTO | responseHandler>;
    addBulkProduct(productData: any): Promise<any>;
    bulkDownload(): Promise<any>;
    updateImage(id: mongoose.Types.ObjectId, index: number, path: string): Promise<boolean | string>;
    getAllProducts(page: number, limit: number): Promise<ProductResponseDTO>;
<<<<<<< HEAD
    getAllListedProducts(page: number, limit: number, userId?: mongoose.Types.ObjectId | null): Promise<ProductResponseDTO>;
    SearchByName(page: number, limit: number, productName: string): Promise<ProductResponseDTO>;
    fetchByCategoryAndName(page: number, limit: number, filter: any, userId?: mongoose.Types.ObjectId | null): Promise<ProductResponseDTO>;
    listProductsByMaincategories(page: number, limit: number, mainCatId: any, userId?: mongoose.Types.ObjectId | null): Promise<any>;
    listProductsBySubcategories(page: number, limit: number, subCatId: any, userId?: mongoose.Types.ObjectId | null): Promise<any>;
    getProductById(id: mongoose.Types.ObjectId, userId?: mongoose.Types.ObjectId | null): Promise<ProductDTO | null>;
=======
    getAllListedProducts(page: number, limit: number, userId?: string | null): Promise<ProductResponseDTO>;
    SearchByName(page: number, limit: number, productName: string): Promise<ProductResponseDTO>;
    fetchByCategoryAndName(page: number, limit: number, filter: any, userId?: string | null): Promise<ProductResponseDTO>;
    listProductsBySubcategories(page: number, limit: number, mainCatId: any, userId?: string | null): Promise<any>;
    getProductById(id: mongoose.Types.ObjectId, userId?: string | null): Promise<ProductDTO | null>;
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
    updateProduct(id: mongoose.Types.ObjectId, data: Partial<ProductCreationDTO>): Promise<ProductDTO | null | responseHandler>;
    listById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>;
    unListById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>;
    deleteProduct(id: mongoose.Types.ObjectId): Promise<boolean>;
    private mapEntityToDto;
}
