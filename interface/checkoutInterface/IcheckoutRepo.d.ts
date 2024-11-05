import { CheckoutCreateDTO } from "../../domain/dtos/CheckoutDTO";
import { ICheckout } from "../../domain/entities/checkoutSchema";
import { OrderSummary, RevenueSummary } from "../../domain/dtos/CheckoutDTO";
export default interface ICheckoutRepo {
    createCheckout(data: CheckoutCreateDTO): Promise<ICheckout>;
    viewAllorders(): Promise<OrderSummary[]>;
    viewRevenue(period: string | undefined): Promise<RevenueSummary[]>;
    generateProductSalesReport(startDate: string | undefined, endDate: string | undefined, interval: 'day' | 'week' | 'month' | 'year'): Promise<any>;
}
