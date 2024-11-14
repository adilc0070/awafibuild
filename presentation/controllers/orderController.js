"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class OrderController {
    orderInteractor;
    constructor(orderInteractor) {
        this.orderInteractor = orderInteractor;
    }
    async createOrder(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const orderData = {
                ...req.body,
                user: userId
            };
            const newOrder = await this.orderInteractor.createOrder(orderData);
            res.status(201).json(newOrder);
        }
        catch (error) {
            next(error);
        }
    }
    async getOrders(req, res, next) {
        try {
            const { status, page = 1, limit = 10 } = req.query;
            const orders = await this.orderInteractor.getOrders({
                page: Number(page),
                limit: Number(limit)
            });
            res.status(200).json(orders);
        }
        catch (error) {
            next(error);
        }
    }
    async getOrderById(req, res, next) {
        try {
            const orderId = req.params.id;
            const order = await this.orderInteractor.getOrderById(orderId);
            if (!order) {
                res.status(404).json({ message: "Order not found" });
                return;
            }
            res.status(200).json(order);
        }
        catch (error) {
            next(error);
        }
    }
    async updateOrderStatus(req, res, next) {
        try {
            const orderIdentifier = new mongoose_1.default.Types.ObjectId(req.params.id); // Convert to ObjectId
            const { trackingId } = req.body;
            const updateData = {
                orderId: orderIdentifier, // Using the new ObjectId
                orderStatus: req.body.orderStatus,
                trackingId: trackingId == undefined ? ' ' : trackingId
            };
            const updatedOrder = await this.orderInteractor.updateOrderStatus(updateData);
            if (!updatedOrder) {
                res.status(404).json({ message: "Order not found" });
                return;
            }
            res.status(200).json(updatedOrder);
        }
        catch (error) {
            next(error);
        }
    }
    async cancelOrder(req, res, next) {
        try {
            const orderId = req.params.id;
            const result = await this.orderInteractor.cancelOrder(orderId);
            if (!result) {
                res.status(404).json({ message: "Order not found" });
                return;
            }
            res.status(200).json({ message: "Order cancelled successfully" });
        }
        catch (error) {
            next(error);
        }
    }
    async getUserOrders(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const { status, page = 1, limit = 10 } = req.query;
            const orders = await this.orderInteractor.getUserOrders({
                userId,
                status: status,
                page: Number(page),
                limit: Number(limit)
            });
            res.status(200).json(orders);
        }
        catch (error) {
            next(error);
        }
    }
    async getUserOrderById(req, res, next) {
        try {
            const userId = req.user?.id;
            const orderId = req.params.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const order = await this.orderInteractor.getUserOrderById(orderId, userId);
            if (!order) {
                res.status(404).json({ message: "Order not found" });
                return;
            }
            res.status(200).json(order);
        }
        catch (error) {
            next(error);
        }
    }
    async cancelUserOrder(req, res, next) {
        try {
            const userId = req.user?.id;
            const orderId = req.params.id;
            const { reason } = req.body;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const result = await this.orderInteractor.cancelUserOrder(orderId, userId, reason);
            if (!result) {
                res.status(404).json({ message: "Order not found" });
                return;
            }
            res.status(200).json({ message: "Order cancelled successfully", reason });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=orderController.js.map