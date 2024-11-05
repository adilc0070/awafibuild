"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const mongoose_1 = require("mongoose");
const baseRepository_1 = require("./baseRepository");
class OrderRepository extends baseRepository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    validateAndConvertId(id, type) {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new Error(`Invalid ${type} ID`);
        }
        return new mongoose_1.Types.ObjectId(id);
    }
    async create(data) {
        try {
            const userObjectId = this.validateAndConvertId(data.user, 'User');
            const orderEntity = {
                user: userObjectId,
                items: data.items,
                totalAmount: data.amount,
                status: 'pending',
                shippingAddress: data.shippingAddress,
                createdAt: new Date()
            };
            return await super.create(data);
        }
        catch (error) {
            throw new Error(`Error creating order: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async findAll(params) {
        try {
            const query = {};
            if (params.status) {
                query.orderStatus = params.status;
            }
            const skip = (params.page - 1) * params.limit;
            const [orders, total] = await Promise.all([
                this.model
                    .find(query)
                    // .populate('user')
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(params.limit)
                    .exec(),
                this.model.countDocuments(query)
            ]);
            return { orders, total, page: params.page, limit: params.limit };
        }
        catch (error) {
            throw new Error(`Error finding orders: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async findByOrderId(orderId) {
        try {
            const orderObjectId = this.validateAndConvertId(orderId, 'Order');
            return await this.model
                .findById(orderObjectId)
                // .populate('user')
                .exec();
        }
        catch (error) {
            throw new Error(`Error finding order: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async updateStatus(data) {
        try {
            //   const orderObjectId = this.validateAndConvertId(data.orderId, 'Order');
            return await this.model.findByIdAndUpdate(data.orderId, {
                $set: {
                    orderStatus: data.orderStatus,
                    updatedAt: new Date(),
                    trackingId: data.trackingId
                }
            }, { new: true }).exec();
        }
        catch (error) {
            throw new Error(`Error updating order status: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async cancel(orderId) {
        try {
            const orderObjectId = this.validateAndConvertId(orderId, 'Order');
            const result = await this.model.findOneAndUpdate({
                _id: orderObjectId,
                orderStatus: { $nin: ['cancelled', 'delivered'] }
            }, {
                $set: {
                    orderStatus: 'cancelled',
                    updatedAt: new Date()
                }
            }).exec();
            return !!result;
        }
        catch (error) {
            throw new Error(`Error cancelling order: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async findByUserId(params) {
        try {
            const userObjectId = this.validateAndConvertId(params.userId, 'User');
            const query = { user: userObjectId };
            if (params.status) {
                query.orderStatus = params.status;
            }
            const skip = (params.page - 1) * params.limit;
            const [orders, total] = await Promise.all([
                this.model
                    .find(query)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(params.limit)
                    .exec(),
                this.model.countDocuments(query)
            ]);
            return {
                orders,
                total,
                page: params.page,
                limit: params.limit
            };
        }
        catch (error) {
            throw new Error(`Error finding user orders: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async findByOrderIdAndUserId(orderId, userId) {
        try {
            const orderObjectId = this.validateAndConvertId(orderId, 'Order');
            const userObjectId = this.validateAndConvertId(userId, 'User');
            return await this.model.findOne({
                _id: orderObjectId,
                user: userObjectId
            }).exec();
        }
        catch (error) {
            throw new Error(`Error finding user order: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async cancelWithReason(orderId, userId, cancellationReason) {
        try {
            const orderObjectId = this.validateAndConvertId(orderId, 'Order');
            const userObjectId = this.validateAndConvertId(userId, 'User');
            const result = await this.model.findOneAndUpdate({
                _id: orderObjectId,
                user: userObjectId,
                orderStatus: { $nin: ['cancelled', 'delivered'] }
            }, {
                $set: {
                    orderStatus: 'cancelled',
                    cancellationReason: cancellationReason,
                    updatedAt: new Date()
                }
            }).exec();
            return !!result;
        }
        catch (error) {
            throw new Error(`Error cancelling order: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=orderRepo.js.map