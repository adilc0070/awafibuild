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
