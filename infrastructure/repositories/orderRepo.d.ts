/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
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
