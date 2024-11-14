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
import mongoose from 'mongoose';
import { categoryCreationDTo } from '../../domain/dtos/CategoryDTO';
import IsubCategory from '../../domain/entities/subCategorySchema';
import { LargeDataFetch } from '../../types/commonTypes';
export default interface ICategoryRepo {
    addCategory(data: categoryCreationDTo): Promise<IsubCategory>;
    getAllCategories(page: number, limit: number): Promise<LargeDataFetch>;
    findCategoryName(page: number, limit: number, name: string): Promise<LargeDataFetch>;
    getListedCategories(mainCategoryId: mongoose.Types.ObjectId, page: number, limit: number): Promise<LargeDataFetch>;
    getCategoryById(id: mongoose.Types.ObjectId): Promise<IsubCategory | null>;
    updateCategory(id: mongoose.Types.ObjectId, data: Partial<categoryCreationDTo>): Promise<IsubCategory | null>;
    deleteCategory(id: mongoose.Types.ObjectId): Promise<boolean>;
    findByName(name: string): Promise<IsubCategory | null>;
    findByNameNotId(id: mongoose.Types.ObjectId, name: string): Promise<IsubCategory | null>;
}
