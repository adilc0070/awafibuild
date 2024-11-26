"use strict";
// src/application/interactor/adminReviewInteractor.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminReviewInteractor = void 0;
class AdminReviewInteractor {
    reviewRepo;
    constructor(reviewRepo) {
        this.reviewRepo = reviewRepo;
    }
    async getAllReviews(params) {
        const { reviews, totalPages } = await this.reviewRepo.findAllReviews(params);
        const mappedReviews = reviews.map(this.mapToDTO);
        return { reviews: mappedReviews, totalPages };
    }
    async updateReviewStatus(reviewId, status) {
        if (status !== 'approved' && status !== 'declined') {
            throw new Error("Invalid status. Status must be 'approved' or 'declined'.");
        }
        const updatedReview = await this.reviewRepo.updateReviewStatus(reviewId, status);
        return this.mapToDTO(updatedReview);
    }
    mapToDTO(review) {
        return {
            id: review._id.toString(),
            userName: review.userName,
            userEmail: review.userEmail,
            reviewContent: review.reviewContent || "",
            rating: review.rating,
            productImage: review.productImage,
            productName: review.productName,
            createdAt: review.createdAt.toISOString(),
            status: review.status,
        };
    }
}
exports.AdminReviewInteractor = AdminReviewInteractor;
//# sourceMappingURL=adminReviewInteractor.js.map