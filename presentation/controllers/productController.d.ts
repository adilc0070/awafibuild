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
<<<<<<< HEAD
    listProductsByMainCategoryForUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    listProductsBySubCategoryForUser(req: Request, res: Response, next: NextFunction): Promise<void>;
=======
    listProductsBySubcategoriesForUser(req: Request, res: Response, next: NextFunction): Promise<void>;
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
    FilterProductsForUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}
