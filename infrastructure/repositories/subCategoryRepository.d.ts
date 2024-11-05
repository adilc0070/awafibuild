import mongoose, { Model } from 'mongoose';
import { BaseRepository } from './baseRepository';
import IsubCategoryRepo from '../../interface/subCategoryInterface/IsubCategoryRepo';
import IsubCategory from '../../domain/entities/subCategorySchema';
import { categoryCreationDTo } from '../../domain/dtos/CategoryDTO';
import { LargeDataFetch } from '../../types/commonTypes';
export declare class SubCategoryRepository extends BaseRepository<IsubCategory> implements IsubCategoryRepo {
    constructor(model: Model<IsubCategory>);
    addCategory(data: categoryCreationDTo): Promise<IsubCategory>;
    getAllCategories(page: number, limit: number): Promise<LargeDataFetch>;
    findCategoryName(page: number, limit: number, name: string): Promise<LargeDataFetch>;
    getListedCategories(mainCategoryId: mongoose.Types.ObjectId, page: number, limit: number): Promise<LargeDataFetch>;
    findByName(name: string): Promise<IsubCategory | null>;
    findByNameNotId(id: mongoose.Types.ObjectId, name: string): Promise<IsubCategory | null>;
    getCategoryById(id: mongoose.Types.ObjectId): Promise<IsubCategory | null>;
    updateCategory(id: mongoose.Types.ObjectId, data: Partial<categoryCreationDTo>): Promise<IsubCategory | null>;
    deleteCategory(id: mongoose.Types.ObjectId): Promise<boolean>;
}
