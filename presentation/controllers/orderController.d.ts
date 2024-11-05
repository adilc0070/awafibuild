import { NextFunction, Request, Response } from "express";
import IOrderInteractor from "../../interface/orderInterface/IOrderInteractor";
export declare class OrderController {
    private orderInteractor;
    constructor(orderInteractor: IOrderInteractor);
    createOrder(req: Request, res: Response, next: NextFunction): Promise<void>;
    getOrders(req: Request, res: Response, next: NextFunction): Promise<void>;
    getOrderById(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateOrderStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    cancelOrder(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserOrders(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserOrderById(req: Request, res: Response, next: NextFunction): Promise<void>;
    cancelUserOrder(req: Request, res: Response, next: NextFunction): Promise<void>;
}
