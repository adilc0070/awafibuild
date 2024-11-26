import mongoose from "mongoose";
import { CreateOrderDTO, OrderDTO, UpdateOrderStatusDTO } from "../../domain/dtos/OrderDto";
import IOrderInteractor from "../../interface/orderInterface/IOrderInteractor";
import IOrderRepository from "../../interface/orderInterface/IOrderRepo";
export declare class OrderInteractor implements IOrderInteractor {
    private orderRepository;
    constructor(orderRepository: IOrderRepository);
    createOrder(data: CreateOrderDTO): Promise<OrderDTO>;
    getOrders(params: {
        page: number;
        limit: number;
    }): Promise<{
        orders: OrderDTO[];
        total: number;
        page: number;
        limit: number;
    }>;
    getOrderById(orderId: mongoose.Types.ObjectId): Promise<OrderDTO | null>;
    updateOrderStatus(data: UpdateOrderStatusDTO): Promise<OrderDTO | null>;
    cancelOrder(orderId: string, reason: string): Promise<boolean>;
    getUserOrders(params: {
        userId: string;
        status?: string;
        page: number;
        limit: number;
    }): Promise<{
        orders: OrderDTO[];
        total: number;
        page: number;
        limit: number;
    }>;
    getUserOrderById(orderId: string, userId: string): Promise<OrderDTO | null>;
    cancelUserOrder(orderId: string, userId: string, cancellationReason: string): Promise<boolean>;
    returnUserOrder(orderId: string, userId: string, returnData: {
        returnReason: string;
        productId?: string;
        variantId?: string;
    }): Promise<any>;
    actionOnReturnOrder(orderId: string, returnData: {
        productId?: string;
        variantId?: string;
        returnStatus: 'approved' | 'rejected';
    }): Promise<any>;
    private mapToDTO;
}
