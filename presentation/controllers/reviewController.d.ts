import { NextFunction, Request, Response } from "express";
import IReviewInteractor from "../../interface/reviewInterface/IreviewInteractor";
export declare class ReviewController {
    private reviewInteractor;
    constructor(reviewInteractor: IReviewInteractor);
    createReview(req: Request, res: Response, next: NextFunction): Promise<void>;
    getReviewsByProductId(req: Request, res: Response, next: NextFunction): Promise<void>;
}
