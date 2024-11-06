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
    getAllListedProducts(page: number, limit: number, userId?: string | null): Promise<ProductResponseDTO>;
    SearchByName(page: number, limit: number, productName: string): Promise<ProductResponseDTO>;
    fetchByCategoryAndName(page: number, limit: number, filter: any, userId?: string | null): Promise<ProductResponseDTO>;
    listProductsBySubcategories(page: number, limit: number, mainCatId: any, userId?: string | null): Promise<any>;
    getProductById(id: mongoose.Types.ObjectId, userId?: string | null): Promise<ProductDTO | null>;
    updateProduct(id: mongoose.Types.ObjectId, data: Partial<ProductCreationDTO>): Promise<ProductDTO | null | responseHandler>;
    listById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>;
    unListById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>;
    deleteProduct(id: mongoose.Types.ObjectId): Promise<boolean>;
    private mapEntityToDto;
}
