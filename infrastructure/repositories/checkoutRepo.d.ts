import { Model } from "mongoose";
import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo";
import { OrderSummary, RevenueSummary, CheckoutCreateDTO } from "../../domain/dtos/CheckoutDTO";
import { ICheckout } from "../../domain/entities/checkoutSchema";
import { BaseRepository } from "./baseRepository";
export declare class CheckoutRepository extends BaseRepository<ICheckout> implements ICheckoutRepo {
    constructor(model: Model<ICheckout>);
    createCheckout(data: CheckoutCreateDTO): Promise<ICheckout>;
    viewAllorders(): Promise<OrderSummary[]>;
    viewRevenue(period: string | undefined): Promise<RevenueSummary[]>;
    generateProductSalesReport(startDate: string, endDate: string, interval: 'day' | 'week' | 'month' | 'year'): Promise<any[]>;
}
