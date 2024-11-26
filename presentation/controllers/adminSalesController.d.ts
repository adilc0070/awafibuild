import { Request, Response } from 'express';
import { IAdminSalesInteractor } from '../../interface/salesInterface/IadminSalesInteractor';
export declare class AdminSalesController {
    private salesInteractor;
    constructor(salesInteractor: IAdminSalesInteractor);
    getSalesReport(req: Request, res: Response): Promise<void>;
    downloadSalesReport(req: Request, res: Response): Promise<void>;
    private handleError;
}
