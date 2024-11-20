import { OrderSummary } from "../../domain/dtos/CheckoutDTO";
import { IDashboardInteractor } from "../../interface/dashboardInterface/IdashboardInteractor";
import IDashboardRepository from "../../interface/dashboardInterface/IDashboardRepo";
declare class DashboardInteractor implements IDashboardInteractor {
    private chekoutRepository;
    constructor(chekoutRepository: IDashboardRepository);
    totalOrders(): Promise<OrderSummary[]>;
    totalRevenue(period?: string): Promise<any>;
    salesReport(reportType?: 'day' | 'week' | 'month' | 'year', startDate?: Date, endDate?: Date): Promise<any>;
}
export default DashboardInteractor;
