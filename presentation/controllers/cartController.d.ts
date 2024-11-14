import { NextFunction, Request, Response } from "express";
import ICartInteractor from "../../interface/cartInterface/IcartInteractor";
export declare class CartController {
    private cartInteractor;
    constructor(cartInteractor: ICartInteractor);
    createCart(req: Request, res: Response, next: NextFunction): Promise<void>;
    getCartByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
    addItemToCart(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateCartItemQuantity(req: Request, res: Response, next: NextFunction): Promise<void>;
    removeItemFromCart(req: Request, res: Response, next: NextFunction): Promise<void>;
    clearCart(req: Request, res: Response, next: NextFunction): Promise<void>;
}
