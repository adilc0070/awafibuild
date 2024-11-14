import { NextFunction, Request, Response } from "express";
import ICategoryInteractor from "../../interface/categoryInterface/IcategoryInteractor";
export declare class CategoryController {
    private categoryInteractor;
    constructor(categoryInteractor: ICategoryInteractor);
    addCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void>;
    searchByCategoryName(req: Request, res: Response, next: NextFunction): Promise<void>;
    getListedCategories(req: Request, res: Response, next: NextFunction): Promise<void>;
    getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
    toggleListStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
}
