import { IadminInteractor } from "../../interface/adminInterface/IadminInteractor";
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { Ijwt } from "../../interface/serviceInterface/IjwtInterface";
import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo";
import { UserResponse, UserActionResponse } from "../../domain/dtos/AdminDto";
import { RevenueSummary, OrderSummary } from "../../domain/dtos/CheckoutDTO";
export declare class AdminInteractor implements IadminInteractor {
    private userRepository;
    private jwt;
    private checkoutRepo;
    constructor(userRepository: IUserRepo, jwt: Ijwt, checkoutRepo: ICheckoutRepo);
    logIn(data: any): Promise<any>;
    usersData(): Promise<UserResponse>;
    blockUser(email: string): Promise<UserActionResponse>;
    unblockUser(email: string): Promise<UserActionResponse>;
    totalOrders(): Promise<OrderSummary[]>;
    totalRevenue(period: string | undefined): Promise<RevenueSummary[]>;
    salesReport(reportType: 'day' | 'week' | 'month' | 'year' | undefined, startDate: string | undefined, endDate: string | undefined): Promise<any>;
}
