import IsubCategoryInteractory from "../../interface/categoryInterface/IcategoryInteractor";
import { responseHandler } from "../../types/commonTypes";
import ICategoryRepo from "../../interface/categoryInterface/IcategoryRepo";
import { categoryCreationDTo, categoryDTo } from '../../domain/dtos/CategoryDTO';
import mongoose from "mongoose";
import { LargeDataFetch } from '../../types/commonTypes';
import { ICloudinaryService } from "../../interface/serviceInterface/IcloudinaryInterface";
export declare class CategoryInteractor implements IsubCategoryInteractory {
    private categoryRepo;
    private cloudinaryService;
    constructor(categoryRepo: ICategoryRepo, cloudinaryService: ICloudinaryService);
    addCategory(data: categoryCreationDTo): Promise<categoryDTo | responseHandler>;
    getAllCategories(page: number, limit: number): Promise<LargeDataFetch>;
    getByName(page: number, limit: number, name: string): Promise<LargeDataFetch>;
    getListedCategories(page: number, limit: number): Promise<LargeDataFetch>;
    getCategoryById(id: mongoose.Types.ObjectId): Promise<categoryDTo | null>;
    updateCategory(id: mongoose.Types.ObjectId, data: Partial<categoryCreationDTo>): Promise<categoryDTo | responseHandler | null>;
    deleteCategory(id: mongoose.Types.ObjectId): Promise<boolean>;
    listById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>;
    unListById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>;
    private mapToDTO;
}
