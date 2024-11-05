import { NextFunction, Request, Response } from "express";
import ICheckoutInteractor from "../../interface/checkoutInterface/IcheckoutInteractor";
export declare class CheckoutController {
    private checkoutInteractor;
    constructor(checkoutInteractor: ICheckoutInteractor);
    checkout(req: Request, res: Response, next: NextFunction): Promise<void>;
}
