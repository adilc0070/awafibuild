"use strict";
// src/presentation/controllers/adminReviewController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminReviewController = void 0;
class AdminReviewController {
    reviewInteractor;
    constructor(reviewInteractor) {
        this.reviewInteractor = reviewInteractor;
    }
    async getAllReviews(req, res, next) {
        try {
            const params = req.query;
            const { reviews, totalPages } = await this.reviewInteractor.getAllReviews(params);
            res.status(200).json({
                reviews,
                totalPages,
                currentPage: params.page || 1,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateReviewStatus(req, res, next) {
        try {
            const { reviewId } = req.params;
            console.log("reviewId: ", reviewId);
            const { status } = req.body; // 'approve' or 'decline'
            console.log("status: ", status);
            const updatedReview = await this.reviewInteractor.updateReviewStatus(reviewId, status);
            console.log("updatedReview: ", updatedReview);
            res.status(200).json(updatedReview);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AdminReviewController = AdminReviewController;
//# sourceMappingURL=adminReviewController.js.map