import mongoose from "mongoose";
import { ProductDTO, ProductCreationDTO } from "../../domain/dtos/ProductDTO";
import { responseHandler } from '../../types/commonTypes';
import { ProductResponseDTO } from '../../types/productTypes';
export default interface IProductInteractor {
    addProduct(data: ProductCreationDTO): Promise<ProductDTO | responseHandler>;
    bulkDownload(): Promise<any>;
    addBulkProduct(data: any): Promise<any>;
    fetchByCategoryAndName(page: number, limit: number, filter: any, userId?: mongoose.Types.ObjectId | null): Promise<ProductResponseDTO>;
    listProductsBySubcategories(page: number, limit: number, mainCatId: mongoose.Types.ObjectId, userId?: mongoose.Types.ObjectId | null): Promise<any>;
    listProductsByMaincategories(page: number, limit: number, mainCatId: mongoose.Types.ObjectId, userId?: mongoose.Types.ObjectId | null): Promise<any>;
    getAllProducts(page: number, limit: number): Promise<ProductResponseDTO>;
    getAllListedProducts(page: number, limit: number, userId?: mongoose.Types.ObjectId | null): Promise<ProductResponseDTO>;
    SearchByName(page: number, limit: number, name: string): Promise<ProductResponseDTO>;
    getProductById(id: mongoose.Types.ObjectId, userId?: mongoose.Types.ObjectId | null): Promise<ProductDTO | null>;
    updateProduct(id: mongoose.Types.ObjectId, data: Partial<ProductCreationDTO>): Promise<ProductDTO | null | responseHandler>;
    deleteProduct(id: mongoose.Types.ObjectId): Promise<boolean>;
    listById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>;
    unListById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>;
    updateImage(id: mongoose.Types.ObjectId, index: number, file: string): Promise<any>;
}
