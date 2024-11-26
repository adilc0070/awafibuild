"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DashboardInteractor {
    chekoutRepository;
    constructor(chekoutRepository) {
        this.chekoutRepository = chekoutRepository;
    }
    async totalOrders() {
        const result = await this.chekoutRepository.viewAllOrders();
        return result;
    }
    async topSellings() {
        const products = await this.chekoutRepository.topSellingProduct();
        return { products };
    }
    async totalRevenue(period) {
        const result = await this.chekoutRepository.viewRevenue(period);
        return result;
    }
    async salesReport(reportType, startDate, endDate) {
        if (!reportType || !startDate || !endDate) {
            throw new Error("Missing required parameters for generating sales report.");
        }
        const result = await this.chekoutRepository.generateProductSalesReport(startDate, endDate, reportType);
        return result;
    }
}
exports.default = DashboardInteractor;
//# sourceMappingURL=dashboardInteractor.js.map