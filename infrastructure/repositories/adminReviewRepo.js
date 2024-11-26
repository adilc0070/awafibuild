"use strict";
// src/infrastructure/repositories/adminReviewRepo.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminReviewRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class AdminReviewRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    /**
     * Fetch all reviews with aggregation
     */
    async findAllReviews(params) {
        const query = {};
        // Add status filter if provided
        if (params.status && params.status !== "all") {
            query.status = params.status;
        }
        // Handle search term
        if (params.search) {
            const searchTerm = params.search.trim();
            const regex = new RegExp(searchTerm, 'i'); // Create case-insensitive regex for the search term
            // Add conditions to match product name, user name, and user email
            query.$or = [
                { "userDetails.name": { $regex: regex } },
                { "userDetails.email": { $regex: regex } },
                { "productDetails.name": { $regex: regex } }
            ];
        }
        const limit = params.limit ? parseInt(params.limit, 10) : 10;
        const skip = params.page ? (parseInt(params.page, 10) - 1) * limit : 0;
        const totalCount = await this.model.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);
        let sortOrder = { createdAt: -1 };
        if (params.sortOrder === "old") {
            sortOrder = { createdAt: 1 };
        }
        // console.log("query: ", query);
        const reviews = await this.model.aggregate([
            // Apply query with optional search conditions
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "userDetails",
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
            { $match: query },
            {
                $addFields: {
                    images: { $arrayElemAt: ["$productDetails.images", 0] }, // Add the first image
                },
            },
            {
                $project: {
                    _id: 1,
                    userName: { $arrayElemAt: ["$userDetails.name", 0] },
                    userEmail: { $arrayElemAt: ["$userDetails.email", 0] },
                    reviewContent: "$comment",
                    rating: 1,
                    productName: { $arrayElemAt: ["$productDetails.name", 0] },
                    productImage: { $arrayElemAt: ["$images", 0] }, // Extract the first image URL
                    status: 1,
                    createdAt: 1,
                },
            },
            { $sort: sortOrder }, // Sort based on createdAt and sortOrder
        ]);
        // console.log("reviews: ", reviews);
        return { reviews: reviews, totalPages };
    }
    /**
     * Update the status of a review and fetch updated review
     */
    async updateReviewStatus(reviewId, status) {
        // Update the status of the review
        const a = await this.model.updateOne({ _id: reviewId }, { $set: { status } });
        console.log("a : ", a);
        // Fetch the updated review using aggregation
        const updatedReview = await this.model.aggregate([
            { $match: { _id: new mongoose_1.default.Types.ObjectId(reviewId) } },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "userDetails",
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
            {
                $addFields: {
                    images: { $arrayElemAt: ["$productDetails.images", 0] } // Define the field you want to add with an expression
                }
            },
            {
                $project: {
                    _id: 1,
                    userName: { $arrayElemAt: ["$userDetails.name", 0] },
                    userEmail: { $arrayElemAt: ["$userDetails.email", 0] },
                    reviewContent: "$comment",
                    rating: 1,
                    productName: { $arrayElemAt: ["$productDetails.name", 0] },
                    productImage: { $arrayElemAt: ["$images", 0] }, // Assuming images is an array
                    status: 1,
                    createdAt: 1,
                },
            },
        ]);
        if (!updatedReview || updatedReview.length === 0) {
            throw new Error("Review not found");
        }
        return updatedReview[0];
    }
}
exports.AdminReviewRepository = AdminReviewRepository;
//# sourceMappingURL=adminReviewRepo.js.map