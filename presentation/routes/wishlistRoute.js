"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/wishlistRoute.ts
const express_1 = __importDefault(require("express"));
const wishlistRepo_1 = require("../../infrastructure/repositories/wishlistRepo");
const wishlistController_1 = require("../controllers/wishlistController");
const wishlistInteractor_1 = require("../../application/interactor/wishlistInteractor");
const wishlistModel_1 = require("../../infrastructure/model/wishlistModel");
// Set up dependencies
const wishlistRepo = new wishlistRepo_1.WishlistRepository(wishlistModel_1.WishlistModel);
const wishlistInteractor = new wishlistInteractor_1.WishlistInteractor(wishlistRepo);
const wishlistController = new wishlistController_1.WishlistController(wishlistInteractor);
const wishlistRoutes = express_1.default.Router();
// Define routes
wishlistRoutes.get("/", wishlistController.getWishlistByUserId.bind(wishlistController));
wishlistRoutes.post("/add", wishlistController.addItemToWishlist.bind(wishlistController));
wishlistRoutes.post("/remove", wishlistController.removeItemFromWishlist.bind(wishlistController));
wishlistRoutes.post("/", wishlistController.createWishlist.bind(wishlistController));
wishlistRoutes.delete("/", wishlistController.deleteWishlist.bind(wishlistController));
exports.default = wishlistRoutes;
//# sourceMappingURL=wishlistRoute.js.map