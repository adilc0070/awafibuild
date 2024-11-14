"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewInteractor = void 0;
class ReviewInteractor {
    reviewRepo;
    constructor(reviewRepo) {
        this.reviewRepo = reviewRepo;
    }
    async createReview(data) {
        const review = await this.reviewRepo.createReview(data);
        return this.mapToDTO(review);
    }
    async getReviewByProductId(productId) {
        const reviews = await this.reviewRepo.findReviewsByProduct(productId);
        return reviews ? reviews.map(this.mapToDTO) : null;
    }
    mapToDTO(iReview) {
        return {
            userId: iReview.user.toString(),
            productId: iReview.product.toString(),
            rating: iReview.rating,
            comment: iReview.comment,
        };
    }
}
exports.ReviewInteractor = ReviewInteractor;
//# sourceMappingURL=reviewInteractor.js.map