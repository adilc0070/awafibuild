import { NextFunction, Request, Response } from "express";
import IAdminReviewInteractor from "../../interface/reviewInterface/IadminReviewInteractor";
export declare class AdminReviewController {
    private reviewInteractor;
    constructor(reviewInteractor: IAdminReviewInteractor);
    getAllReviews(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateReviewStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
}
