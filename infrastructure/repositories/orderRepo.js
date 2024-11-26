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
            const skip = (params.page - 1) * params.limit;
            const [orders, total] = await Promise.all([
                this.model.aggregate([
                    {
                        $lookup: {
                            from: 'users',
                            let: { userId: "$user" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
                                { $project: { password: 0, _id: 0 } } // exclude user ID and password fields
                            ],
                            as: 'userDetails'
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            user: 1,
                            trackingId: 1, // Make sure trackingId is included in the projection
                            orderStatus: 1,
                            paymentStatus: 1,
                            amount: 1,
                            currency: 1,
                            items: 1,
                            shippingAddress: 1,
                            paymentMethod: 1,
                            createdAt: 1,
                            updatedAt: 1,
                            discountAmount: 1,
                            userDetails: { $arrayElemAt: ["$userDetails", 0] } // Flatten userDetails array
                        }
                    },
                    { $sort: { createdAt: -1 } },
                    { $skip: skip },
                    { $limit: params.limit }
                ]),
                this.model.countDocuments()
            ]);
            return { orders, total, page: params.page, limit: params.limit };
        }
        catch (error) {
            throw new Error(`Error finding orders: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async findByOrderId(orderId) {
        try {
            return await this.model
                .findById(orderId)
                // .populate('user')
                .exec();
        }
        catch (error) {
            throw new Error(`Error finding order: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async updateStatus(data) {
        try {
            // Prepare the update fields
            const updateFields = {
                orderStatus: data.orderStatus,
                updatedAt: new Date(),
            };
            // Only include trackingId if it's a non-null and non-empty string
            if (data.trackingId && typeof data.trackingId === 'string' && data.trackingId.trim().length > 0) {
                updateFields.trackingId = data.trackingId;
            }
            // Update the document
            return await this.model
                .findByIdAndUpdate(data.orderId, { $set: updateFields }, { new: true })
                .exec();
        }
        catch (error) {
            throw new Error(`Error updating order status: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async cancelOrder(orderId, reason) {
        try {
            const orderObjectId = this.validateAndConvertId(orderId, 'Order');
            const result = await this.model.findOneAndUpdate({
                _id: orderObjectId,
                orderStatus: { $nin: ['cancelled', 'delivered'] }
            }, {
                $set: {
                    orderStatus: 'cancelled',
                    cancellationReason: reason,
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
    async returnOneProduct(orderId, returnData) {
        const { productId, variantId, returnReason } = returnData;
        // Update the return status and reason for the specific product variant
        const result = await this.model.updateOne({ _id: orderId, "items.productId": productId, "items.variantId": variantId, orderStatus: "delivered" }, {
            $set: {
                "items.$.returnStatus": "requested",
                "items.$.returnReason": returnReason,
                returnRequestedAt: new Date(),
            },
        });
        return result.modifiedCount > 0
            ? { success: true, message: "Product return requested successfully." }
            : { success: false, message: "Product or variant not found in the order." };
    }
    async returnTheOrder(orderId, returnReason) {
        const result = await this.model.updateOne({ _id: orderId, orderStatus: "delivered" }, {
            $set: {
                returnRequestedAt: new Date(),
                returnStatus: "requested",
                returnReason: returnReason
            },
        });
        return result.modifiedCount > 0
            ? { success: true, message: "Order return requested successfully." }
            : { success: false, message: "Order not found " };
    }
    async actionOnReturnOneProduct(orderId, data) {
        const { returnStatus, refundAmount, productId, variantId } = data;
        const result = await this.model.updateOne({
            _id: orderId,
            orderStatus: "delivered",
            "items.productId": productId,
            "items.variantId": variantId, // Match the specific product and variant
        }, {
            $set: {
                "items.$.returnStatus": returnStatus,
                "items.$.refundAmount": refundAmount,
            },
            $inc: {
                amount: -refundAmount, // Subtract refundAmount from the total amount
            },
        });
        return result;
    }
    async returnOrder(orderId, returnStatus) {
        const result = await this.model.updateOne({ _id: orderId, orderStatus: "delivered" }, { $set: {
                returnStatus: returnStatus
            } });
    }
}
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=orderRepo.js.map