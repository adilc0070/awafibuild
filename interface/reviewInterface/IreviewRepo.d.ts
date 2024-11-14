import { IReview } from "../../domain/entities/reviewSchema";
import { CreateReviewDTO } from "../../domain/dtos/ReviewDTO";
export default interface IReviewRepo {
    createReview(data: CreateReviewDTO): Promise<IReview>;
    findReviewsByProduct(productId: string): Promise<IReview[] | null>;
}
