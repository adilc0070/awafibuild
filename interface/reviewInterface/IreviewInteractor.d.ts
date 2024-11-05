import { ReviewDTO, CreateReviewDTO } from "../../domain/dtos/ReviewDTO";
export default interface IReviewInteractor {
    createReview(data: CreateReviewDTO): Promise<ReviewDTO>;
    getReviewByProductId(productId: string): Promise<ReviewDTO[] | null>;
}
