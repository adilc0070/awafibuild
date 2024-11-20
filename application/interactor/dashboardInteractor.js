"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DashboardInteractor {
    chekoutRepository;
    constructor(chekoutRepository) {
        this.chekoutRepository = chekoutRepository;
    }
    async totalOrders() {
        try {
            const result = await this.chekoutRepository.viewAllOrders();
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async totalRevenue(period) {
        try {
            const result = await this.chekoutRepository.viewRevenue(period);
            return result;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async salesReport(reportType, startDate, endDate) {
        try {
            if (!reportType || !startDate || !endDate) {
                throw new Error("Missing required parameters for generating sales report.");
            }
            const result = await this.chekoutRepository.generateProductSalesReport(startDate, endDate, reportType);
            return result;
        }
        catch (error) {
            console.error('Error generating sales report:', error);
            throw error;
        }
    }
}
exports.default = DashboardInteractor;
//# sourceMappingURL=dashboardInteractor.js.map