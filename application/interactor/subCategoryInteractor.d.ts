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
