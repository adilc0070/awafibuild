"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewRepo_1 = require("../../infrastructure/repositories/reviewRepo");
const reviewController_1 = require("../controllers/reviewController");
const reviewInteractor_1 = require("../../application/interactor/reviewInteractor");
const reviewModel_1 = require("../../infrastructure/model/reviewModel");
// Set up dependencies
const reviewRepo = new reviewRepo_1.ReviewRepository(reviewModel_1.ReviewModel);
const reviewInteractor = new reviewInteractor_1.ReviewInteractor(reviewRepo);
const reviewController = new reviewController_1.ReviewController(reviewInteractor);
const reviewRoutes = express_1.default.Router();
// Define routes
reviewRoutes.post("/", reviewController.createReview.bind(reviewController));
reviewRoutes.get("/:productId", reviewController.getReviewsByProductId.bind(reviewController));
exports.default = reviewRoutes;
//# sourceMappingURL=reviewRoute.js.map