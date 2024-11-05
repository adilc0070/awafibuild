import { NextFunction, Request, Response } from "express";
import IWishlistInteractor from "../../interface/wishlistInterface/IwishlistInteractor";
export declare class WishlistController {
    private wishlistInteractor;
    constructor(wishlistInteractor: IWishlistInteractor);
    getWishlistByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
    addItemToWishlist(req: Request, res: Response, next: NextFunction): Promise<void>;
    removeItemFromWishlist(req: Request, res: Response, next: NextFunction): Promise<void>;
    createWishlist(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteWishlist(req: Request, res: Response, next: NextFunction): Promise<void>;
}
