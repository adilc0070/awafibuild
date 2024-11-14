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
