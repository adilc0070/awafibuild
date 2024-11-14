import { Model } from "mongoose";
import { IReview } from "../../domain/entities/reviewSchema";
import IReviewRepo from "../../interface/reviewInterface/IreviewRepo";
import { CreateReviewDTO } from "../../domain/dtos/ReviewDTO";
import { BaseRepository } from "./baseRepository";
export declare class ReviewRepository extends BaseRepository<IReview> implements IReviewRepo {
    constructor(model: Model<IReview>);
    private validateObjectId;
    createReview(data: CreateReviewDTO): Promise<IReview>;
    findReviewsByProduct(productId: string): Promise<IReview[] | null>;
}
