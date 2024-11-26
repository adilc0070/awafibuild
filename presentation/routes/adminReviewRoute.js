"use strict";
// src/presentation/routes/adminReviewRoute.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminReviewController_1 = require("../controllers/adminReviewController");
const adminReviewInteractor_1 = require("../../application/interactor/adminReviewInteractor");
const adminReviewRepo_1 = require("../../infrastructure/repositories/adminReviewRepo");
const reviewModel_1 = require("../../infrastructure/model/reviewModel");
// Set up dependencies
const reviewRepo = new adminReviewRepo_1.AdminReviewRepository(reviewModel_1.ReviewModel);
const adminReviewInteractor = new adminReviewInteractor_1.AdminReviewInteractor(reviewRepo);
const adminReviewController = new adminReviewController_1.AdminReviewController(adminReviewInteractor);
const adminReviewRoutes = express_1.default.Router();
// Define routes
adminReviewRoutes.get("/", adminReviewController.getAllReviews.bind(adminReviewController));
adminReviewRoutes.patch("/:reviewId/approved", adminReviewController.updateReviewStatus.bind(adminReviewController));
adminReviewRoutes.patch("/:reviewId/declined", adminReviewController.updateReviewStatus.bind(adminReviewController));
exports.default = adminReviewRoutes;
//# sourceMappingURL=adminReviewRoute.js.map