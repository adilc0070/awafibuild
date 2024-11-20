import { Model } from "mongoose";
import { OrderSummary, RevenueSummary } from "../../domain/dtos/CheckoutDTO";
import { ICheckout } from "../../domain/entities/checkoutSchema";
import { BaseRepository } from "./baseRepository";
export declare class DashboardRepository extends BaseRepository<ICheckout> implements DashboardRepository {
    constructor(model: Model<ICheckout>);
    viewAllOrders(): Promise<OrderSummary[]>;
    viewRevenue(period: 'day' | 'month' | 'year'): Promise<{
        totalRevenue: number;
        data: RevenueSummary[];
    }>;
    generateProductSalesReport(startDate: Date, endDate: Date, interval: 'day' | 'week' | 'month' | 'year'): Promise<any[]>;
}
export default DashboardRepository;
