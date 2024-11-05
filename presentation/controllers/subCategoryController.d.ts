import { NextFunction, Request, Response } from "express";
import IsubCategoryInteractor from "../../interface/subCategoryInterface/IsubCategoryInteractory";
export declare class SubCategoryController {
    private categoryInteractor;
    constructor(categoryInteractor: IsubCategoryInteractor);
    addCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void>;
    searchBySubCategoryName(req: Request, res: Response, next: NextFunction): Promise<void>;
    getListedCategories(req: Request, res: Response, next: NextFunction): Promise<void>;
    getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
    toggleListStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
}
