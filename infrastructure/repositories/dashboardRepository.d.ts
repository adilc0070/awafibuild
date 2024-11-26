import { Model } from "mongoose";
import { OrderSummary, RevenueSummary } from "../../domain/dtos/CheckoutDTO";
import { ICheckout } from "../../domain/entities/checkoutSchema";
import { BaseRepository } from "./baseRepository";
import IDashboardRepository from "../../interface/dashboardInterface/IDashboardRepo";
export declare class DashboardRepository extends BaseRepository<ICheckout> implements IDashboardRepository {
    constructor(model: Model<ICheckout>);
    topSellingProduct(): Promise<any[]>;
    viewAllOrders(): Promise<OrderSummary[]>;
    viewRevenue(period: 'day' | 'month' | 'year'): Promise<{
        totalRevenue: number;
        data: RevenueSummary[];
    }>;
    generateProductSalesReport(startDate: Date, endDate: Date, interval: 'day' | 'week' | 'month' | 'year'): Promise<void>;
}
export default DashboardRepository;
