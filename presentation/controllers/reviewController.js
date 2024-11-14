"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
class ReviewController {
    reviewInteractor;
    constructor(reviewInteractor) {
        this.reviewInteractor = reviewInteractor;
    }
    // Create a new review (HTTP POST)
    async createReview(req, res, next) {
        try {
            if (!req.user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const userId = req.user?.id;
            const reviewData = req.body;
            reviewData.userId = userId;
            const review = await this.reviewInteractor.createReview(reviewData);
            res.status(201).json(review);
        }
        catch (error) {
            next(error);
        }
    }
    // Get reviews by product ID (HTTP GET)
    async getReviewsByProductId(req, res, next) {
        try {
            const productId = req.params.productId;
            const reviews = await this.reviewInteractor.getReviewByProductId(productId);
            res.status(200).json(reviews);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ReviewController = ReviewController;
//# sourceMappingURL=reviewController.js.map