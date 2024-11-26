import { IAdminSalesInteractor } from '../../interface/salesInterface/IadminSalesInteractor';
import { ISalesRepository } from '../../interface/salesInterface/IsalesRepo';
import { SalesSummary, ReportType } from '../../types/salesReport';
export declare class AdminSalesInteractor implements IAdminSalesInteractor {
    private salesRepository;
    constructor(salesRepository: ISalesRepository);
    generateSalesReport(reportType: ReportType, startDate?: string, endDate?: string): Promise<SalesSummary>;
    generateSalesReportExcel(reportType: ReportType, startDate?: string, endDate?: string): Promise<Buffer>;
    private validateDateInput;
}
