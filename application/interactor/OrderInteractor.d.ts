import { CreateOrderDTO, OrderDTO, UpdateOrderStatusDTO } from "../../domain/dtos/OrderDto";
import IOrderInteractor from "../../interface/orderInterface/IOrderInteractor";
import IOrderRepository from "../../interface/orderInterface/IOrderRepo";
export declare class OrderInteractor implements IOrderInteractor {
    private orderRepository;
    constructor(orderRepository: IOrderRepository);
    createOrder(data: CreateOrderDTO): Promise<OrderDTO>;
    getOrders(params: {
        status?: string;
        page: number;
        limit: number;
    }): Promise<{
        orders: OrderDTO[];
        total: number;
        page: number;
        limit: number;
    }>;
    getOrderById(orderId: string): Promise<OrderDTO | null>;
    updateOrderStatus(data: UpdateOrderStatusDTO): Promise<OrderDTO | null>;
    cancelOrder(orderId: string): Promise<boolean>;
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
    private mapToDTO;
}
