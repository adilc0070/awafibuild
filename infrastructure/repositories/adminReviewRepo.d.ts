import { Model } from "mongoose";
import { IReview } from "../../domain/entities/reviewSchema";
import IAdminReviewRepo from "../../interface/reviewInterface/IadminReviewRepo";
import mongoose from "mongoose";
export interface IAggregatedReview extends IReview {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    userName: string;
    userEmail: string;
    reviewContent: string;
    productName: string;
    productImage: string;
}
export declare class AdminReviewRepository implements IAdminReviewRepo {
    private model;
    constructor(model: Model<IReview>);
    /**
     * Fetch all reviews with aggregation
     */
    findAllReviews(params: any): Promise<{
        reviews: IAggregatedReview[];
        totalPages: number;
    }>;
    /**
     * Update the status of a review and fetch updated review
     */
    updateReviewStatus(reviewId: string, status: "pending" | "approved" | "declined"): Promise<IAggregatedReview>;
}
