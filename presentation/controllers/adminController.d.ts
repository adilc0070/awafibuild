import { Request, Response, NextFunction } from "express";
import { IadminInteractor } from "../../interface/adminInterface/IadminInteractor";
export declare class AdminController {
    private adminInteractor;
    constructor(adminInteractor: IadminInteractor);
    adminLogin(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    allUsers(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    blockUser(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    unblockUser(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
