import { NextFunction, Request, Response } from "express";
import { IDashboardInteractor } from "../../interface/dashboardInterface/IdashboardInteractor";
declare class DashboardController {
    private dashboardInteractor;
    constructor(dashboardInteractor: IDashboardInteractor);
    dashTotalOrders(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    dashTotalRevenue(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    topSellings(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    salesReport(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default DashboardController;
