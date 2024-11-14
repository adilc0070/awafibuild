"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//  src/presentation/routes/cartRoute.ts
const express_1 = __importDefault(require("express"));
const cartRepo_1 = require("../../infrastructure/repositories/cartRepo");
const cartController_1 = require("../controllers/cartController");
const cartInteractor_1 = require("../../application/interactor/cartInteractor");
const cartModel_1 = require("../../infrastructure/model/cartModel");
const cartRepo = new cartRepo_1.CartRepository(cartModel_1.CartModel);
const cartInteractor = new cartInteractor_1.CartInteractor(cartRepo);
const cartController = new cartController_1.CartController(cartInteractor);
const cartRoutes = express_1.default.Router();
cartRoutes.post("/", cartController.createCart.bind(cartController));
cartRoutes.get("/", cartController.getCartByUserId.bind(cartController));
cartRoutes.post("/add", cartController.addItemToCart.bind(cartController));
cartRoutes.put("/update", cartController.updateCartItemQuantity.bind(cartController));
cartRoutes.post("/remove", cartController.removeItemFromCart.bind(cartController));
cartRoutes.delete("/", cartController.clearCart.bind(cartController));
exports.default = cartRoutes;
//# sourceMappingURL=cartRoute.js.map