"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/presentation/routes/cartRoute.ts
const express_1 = __importDefault(require("express"));
const bannerController_1 = require("../controllers/bannerController");
const bannerInteractor_1 = require("../../application/interactor/bannerInteractor");
const multerConfig_1 = require("../../config/multerConfig");
const cloudinary_1 = __importDefault(require("../../application/services/cloudinary"));
// Set up dependencies
const cloudinaryService = new cloudinary_1.default();
const bannerInteractor = new bannerInteractor_1.BannerInteractor(cloudinaryService);
const bannerController = new bannerController_1.BannerController(bannerInteractor);
const bannerRoutes = express_1.default.Router();
// Define routes
// bannerRoutes.use(verifyAdminToken)
bannerRoutes.post("/offerBanner", multerConfig_1.uploadImages.single('image'), bannerController.addOfferBanner.bind(bannerController));
bannerRoutes.get("/allBanners", bannerController.allBanners.bind(bannerController));
bannerRoutes.post("/unlistBanner", bannerController.unlistBanner.bind(bannerController));
bannerRoutes.get("/viewWelcomeBanner", bannerController.welcomeBanners.bind(bannerController));
bannerRoutes.get("/viewOfferBanner", bannerController.offerBanners.bind(bannerController));
bannerRoutes.get("/viewCollectionBanner", bannerController.collectionBanners.bind(bannerController));
exports.default = bannerRoutes;
//# sourceMappingURL=bannerRoute.js.map