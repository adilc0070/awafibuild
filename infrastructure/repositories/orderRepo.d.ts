import { Model } from "mongoose";
import { CreateOrderDTO, UpdateOrderStatusDTO } from "../../domain/dtos/OrderDto";
import { ICheckout } from "../../domain/entities/checkoutSchema";
import { BaseRepository } from "./baseRepository";
import IOrderRepository from "../../interface/orderInterface/IOrderRepo";
export declare class OrderRepository extends BaseRepository<ICheckout> implements IOrderRepository {
    constructor(model: Model<ICheckout>);
    private validateAndConvertId;
    create(data: CreateOrderDTO): Promise<ICheckout>;
    findAll(params: {
        status?: string;
        page: number;
        limit: number;
    }): Promise<{
        orders: ICheckout[];
        total: number;
        page: number;
        limit: number;
    }>;
    findByOrderId(orderId: string): Promise<ICheckout | null>;
    updateStatus(data: UpdateOrderStatusDTO): Promise<ICheckout | null>;
    cancel(orderId: string): Promise<boolean>;
    findByUserId(params: {
        userId: string;
        status?: string;
        page: number;
        limit: number;
    }): Promise<{
        orders: ICheckout[];
        total: number;
        page: number;
        limit: number;
    }>;
    findByOrderIdAndUserId(orderId: string, userId: string): Promise<ICheckout | null>;
    cancelWithReason(orderId: string, userId: string, cancellationReason: string): Promise<boolean>;
}
