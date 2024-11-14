import mongoose, { Model } from 'mongoose';
import { BaseRepository } from './baseRepository';
import ICategoryRepo from '../../interface/categoryInterface/IcategoryRepo';
import ICategory from '../../domain/entities/categorySchema';
import { categoryCreationDTo } from '../../domain/dtos/CategoryDTO';
import { LargeDataFetch } from '../../types/commonTypes';
export declare class CategoryRepository extends BaseRepository<ICategory> implements ICategoryRepo {
    constructor(model: Model<ICategory>);
    addCategory(data: categoryCreationDTo): Promise<ICategory>;
    getAllCategories(page: number, limit: number): Promise<LargeDataFetch>;
    findbyNameSpellings(page: number, limit: number, name: string): Promise<LargeDataFetch>;
    getListedCategories(page: number, limit: number): Promise<LargeDataFetch>;
    findByName(name: string): Promise<ICategory | null>;
    findByNameNotId(id: mongoose.Types.ObjectId, name: string): Promise<ICategory | null>;
    getCategoryById(id: mongoose.Types.ObjectId): Promise<ICategory | null>;
    updateCategory(id: mongoose.Types.ObjectId, data: Partial<categoryCreationDTo>): Promise<ICategory | null>;
    deleteCategory(id: mongoose.Types.ObjectId): Promise<boolean>;
}
