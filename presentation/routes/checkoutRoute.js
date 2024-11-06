"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkoutRepo_1 = require("../../infrastructure/repositories/checkoutRepo");
const checkoutController_1 = require("../controllers/checkoutController");
const checkoutInteractor_1 = require("../../application/interactor/checkoutInteractor");
const checkoutModel_1 = require("../../infrastructure/model/checkoutModel");
const cartRepo_1 = require("../../infrastructure/repositories/cartRepo");
const cartModel_1 = require("../../infrastructure/model/cartModel");
const productRepository_1 = require("../../infrastructure/repositories/productRepository");
const paymentGateways_1 = __importDefault(require("../../infrastructure/paymentGateways"));
const producModel_1 = require("../../infrastructure/model/producModel");
const checkoutRepo = new checkoutRepo_1.CheckoutRepository(checkoutModel_1.CheckoutModel);
const cartRepo = new cartRepo_1.CartRepository(cartModel_1.CartModel);
const productRepo = new productRepository_1.ProductRepository(producModel_1.ProductModel);
const checkoutInteractor = new checkoutInteractor_1.CheckoutInteractor(cartRepo, checkoutRepo, productRepo, paymentGateways_1.default);
const checkoutController = new checkoutController_1.CheckoutController(checkoutInteractor);
const checkoutRoutes = express_1.default.Router();
checkoutRoutes.post("/", checkoutController.checkout.bind(checkoutController));
checkoutRoutes.get("/", checkoutController.getSecretKey.bind(checkoutController));
exports.default = checkoutRoutes;
//# sourceMappingURL=checkoutRoute.js.map