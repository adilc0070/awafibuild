import { ISalesRepository } from '../../interface/salesInterface/IsalesRepo';
import { SalesSummary, ReportType } from '../../types/salesReport';
export declare class AdminSalesRepository implements ISalesRepository {
    private getDateRangeFilter;
    generateSalesReport(reportType: ReportType, startDate?: Date, endDate?: Date): Promise<SalesSummary>;
    exportSalesReportToExcel(reportType: ReportType, startDate?: Date, endDate?: Date): Promise<Buffer>;
}
export declare class SalesReportExcelGenerator {
    private salesData;
    private workbook;
    private worksheet;
    constructor(salesData: SalesSummary);
    private addCompanyLogo;
    private getTextHeight;
    private addReportHeader;
    private addReportSummary;
    private addTopSellingProductsHeader;
    private addTopSellingProducts;
    private styleWorksheet;
    generateExcel(): Promise<Buffer>;
    static create(salesData: SalesSummary): Promise<Buffer>;
}
