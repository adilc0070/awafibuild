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
