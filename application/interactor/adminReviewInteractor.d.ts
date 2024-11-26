import IAdminReviewRepo from "../../interface/reviewInterface/IadminReviewRepo";
import IAdminReviewInteractor from "../../interface/reviewInterface/IadminReviewInteractor";
import { AdminReviewDTO } from "../../domain/dtos/ReviewDTO";
export declare class AdminReviewInteractor implements IAdminReviewInteractor {
    private reviewRepo;
    constructor(reviewRepo: IAdminReviewRepo);
    getAllReviews(params: any): Promise<{
        reviews: AdminReviewDTO[];
        totalPages: number;
    }>;
    updateReviewStatus(reviewId: string, status: string): Promise<AdminReviewDTO>;
    private mapToDTO;
}
