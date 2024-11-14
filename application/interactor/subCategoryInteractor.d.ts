import { LargeDataFetch, responseHandler } from "../../types/commonTypes";
import IsubCategoryRepo from "../../interface/subCategoryInterface/IsubCategoryRepo";
import { subCategoryCreationDTo, subCategoryDTo } from '../../domain/dtos/SubCategoryDTO';
import IsubCategoryInteractor from "../../interface/subCategoryInterface/IsubCategoryInteractory";
import mongoose from "mongoose";
export declare class SubCategoryInteractor implements IsubCategoryInteractor {
    private categoryRepo;
    constructor(categoryRepo: IsubCategoryRepo);
    addCategory(data: subCategoryCreationDTo): Promise<subCategoryDTo | responseHandler>;
    getAllCategories(page: number, limit: number): Promise<LargeDataFetch>;
    searchByname(page: number, limit: number, name: string): Promise<LargeDataFetch>;
    getListedCategories(mainCategoryId: mongoose.Types.ObjectId, page: number, limit: number): Promise<LargeDataFetch>;
    getCategoryById(id: mongoose.Types.ObjectId): Promise<subCategoryDTo | null>;
    updateCategory(categoryId: mongoose.Types.ObjectId, data: Partial<subCategoryCreationDTo>): Promise<subCategoryDTo | responseHandler | null>;
    deleteCategory(id: mongoose.Types.ObjectId): Promise<boolean>;
    listById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>;
    unListById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>;
    private mapToDTO;
}
