import IReviewRepo from "../../interface/reviewInterface/IreviewRepo";
import IReviewInteractor from "../../interface/reviewInterface/IreviewInteractor";
import { ReviewDTO, CreateReviewDTO } from "../../domain/dtos/ReviewDTO";
export declare class ReviewInteractor implements IReviewInteractor {
    private reviewRepo;
    constructor(reviewRepo: IReviewRepo);
    createReview(data: CreateReviewDTO): Promise<ReviewDTO>;
    getReviewByProductId(productId: string): Promise<ReviewDTO[] | null>;
    private mapToDTO;
}
