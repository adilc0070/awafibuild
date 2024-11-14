"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/orderRoute.ts
const express_1 = __importDefault(require("express"));
const orderRepo_1 = require("../../infrastructure/repositories/orderRepo");
const orderController_1 = require("../controllers/orderController");
const OrderInteractor_1 = require("../../application/interactor/OrderInteractor");
const adminAuthMiddleware_1 = require("../middleware/adminAuthMiddleware");
const userAuthMiddleware_1 = require("../middleware/userAuthMiddleware");
const checkoutModel_1 = require("../../infrastructure/model/checkoutModel");
adminAuthMiddleware_1.verifyAdminToken;
// Set up dependencies
const orderRepo = new orderRepo_1.OrderRepository(checkoutModel_1.CheckoutModel);
const orderInteractor = new OrderInteractor_1.OrderInteractor(orderRepo);
const orderController = new orderController_1.OrderController(orderInteractor);
const orderRoutes = express_1.default.Router();
// Admin routes
orderRoutes.get("/order/admin", adminAuthMiddleware_1.verifyAdminToken, orderController.getOrders.bind(orderController));
orderRoutes.get("/order/admin/:id", adminAuthMiddleware_1.verifyAdminToken, orderController.getOrderById.bind(orderController));
orderRoutes.patch("/order/admin/:id/status", adminAuthMiddleware_1.verifyAdminToken, orderController.updateOrderStatus.bind(orderController));
orderRoutes.delete("/order/admin/:id", adminAuthMiddleware_1.verifyAdminToken, orderController.cancelOrder.bind(orderController));
// User routes
orderRoutes.post("/order", userAuthMiddleware_1.verifyToken, orderController.createOrder.bind(orderController));
orderRoutes.get("/order/user", userAuthMiddleware_1.verifyToken, orderController.getUserOrders.bind(orderController));
orderRoutes.get("/order/user/:id", userAuthMiddleware_1.verifyToken, orderController.getUserOrderById.bind(orderController));
orderRoutes.patch("/order/user/:id/cancel", userAuthMiddleware_1.verifyToken, orderController.cancelUserOrder.bind(orderController));
exports.default = orderRoutes;
//# sourceMappingURL=orderRoute.js.map