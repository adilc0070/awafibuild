"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderInteractor = void 0;
class OrderInteractor {
    orderRepository;
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async createOrder(data) {
        const order = await this.orderRepository.create(data);
        return this.mapToDTO(order);
    }
    async getOrders(params) {
        const result = await this.orderRepository.findAll(params);
        return {
            orders: result.orders.map(order => this.mapToDTO(order)),
            total: result.total,
            page: result.page,
            limit: result.limit
        };
    }
    async getOrderById(orderId) {
        const order = await this.orderRepository.findByOrderId(orderId);
        return order ? this.mapToDTO(order) : null;
    }
    async updateOrderStatus(data) {
        const { orderId, orderStatus } = data;
        const orderData = await this.orderRepository.findByOrderId(orderId);
        if (!orderData) {
            throw new Error("Order not found");
        }
        if (orderStatus === "shipped" || orderStatus === "delivered") {
            if (orderData.paymentStatus === "pending" || orderData.paymentStatus === "failed") {
                throw new Error("Payment is not completed");
            }
        }
        const updatedOrder = await this.orderRepository.updateStatus(data);
        return updatedOrder ? this.mapToDTO(updatedOrder) : null;
    }
    async cancelOrder(orderId, reason) {
        return await this.orderRepository.cancelOrder(orderId, reason);
    }
    async getUserOrders(params) {
        const result = await this.orderRepository.findByUserId(params);
        return {
            orders: result.orders.map(order => this.mapToDTO(order)),
            total: result.total,
            page: result.page,
            limit: result.limit
        };
    }
    async getUserOrderById(orderId, userId) {
        const order = await this.orderRepository.findByOrderIdAndUserId(orderId, userId);
        return order ? this.mapToDTO(order) : null;
    }
    async cancelUserOrder(orderId, userId, cancellationReason) {
        return await this.orderRepository.cancelWithReason(orderId, userId, cancellationReason);
    }
    mapToDTO(order) {
        return {
            _id: order._id,
            user: order.user,
            transactionId: order.transactionId || '',
            amount: order.amount,
            items: order.items,
            cancellationReason: order.cancellationReason || '',
            orderStatus: order.orderStatus,
            shippingAddress: order.shippingAddress,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            cart: order.cart,
            paymentMethod: order.paymentMethod,
            currency: order.currency || 'USD',
            discountAmount: order.discountAmount || 0,
            paymentStatus: order.paymentStatus,
            trackingId: order.trackingId || '',
            userDetails: order.userDetails,
        };
    }
}
exports.OrderInteractor = OrderInteractor;
//# sourceMappingURL=OrderInteractor.js.map