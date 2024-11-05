"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRepository = void 0;
const mongoose_1 = require("mongoose");
const baseRepository_1 = require("./baseRepository");
// Review repository extending the base repository
class ReviewRepository extends baseRepository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    validateObjectId(id, type) {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new Error(`Invalid ${type} ID`);
        }
    }
    async createReview(data) {
        try {
            this.validateObjectId(data.userId, 'User');
            this.validateObjectId(data.productId, 'Product');
            this.validateObjectId(data.orderId, 'Order');
            // Check if a review already exists for the user, product, and order
            const existingReview = await this.model.findOne({
                user: data.userId,
                product: data.productId,
                order: data.orderId
            }).exec();
            const reviewEntity = {
                user: data.userId,
                product: data.productId,
                order: data.orderId,
                rating: data.rating,
                comment: data.comment
            };
            if (existingReview) {
                const updatedReview = await this.model.findByIdAndUpdate(existingReview._id, reviewEntity, { new: true }).exec();
                if (!updatedReview) {
                    throw new Error('Failed to update review');
                }
                return updatedReview;
            }
            else {
                return await super.create(reviewEntity);
            }
        }
        catch (error) {
            throw new Error(`Error creating or updating review: ${error.message}`);
        }
    }
    async findReviewsByProduct(productId) {
        try {
            this.validateObjectId(productId, 'Product');
            return await super.find({ product: productId });
        }
        catch (error) {
            throw new Error(`Error finding reviews for product: ${error.message}`);
        }
    }
}
exports.ReviewRepository = ReviewRepository;
//# sourceMappingURL=reviewRepo.js.map