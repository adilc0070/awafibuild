import { NextFunction, Request, Response } from "express";
import IProductInteractor from "../../interface/productInterface/IproductInteractor";
export declare class ProductController {
    private productInteractor;
    constructor(productInteractor: IProductInteractor);
    addProduct(req: Request, res: Response, next: NextFunction): Promise<void>;
    bulkAdding(req: Request, res: Response, next: NextFunction): Promise<void>;
    bulkDownload(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateImage(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllListedProducts(req: Request, res: Response, next: NextFunction): Promise<void>;
    SearchByName(req: Request, res: Response, next: NextFunction): Promise<void>;
    FilterProducts(req: Request, res: Response, next: NextFunction): Promise<void>;
    getProductById(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateProduct(req: Request, res: Response, next: NextFunction): Promise<void>;
    toggleListStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllListedProductsForUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    getProductByIdForUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    listProductsByMainCategoryForUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    listProductsBySubCategoryForUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    FilterProductsForUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}
