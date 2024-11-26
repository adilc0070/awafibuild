"use strict";
// src/application/interactor/adminSalesInteractor.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSalesInteractor = void 0;
class AdminSalesInteractor {
    salesRepository;
    constructor(salesRepository) {
        this.salesRepository = salesRepository;
    }
    async generateSalesReport(reportType, startDate, endDate) {
        // Validate input
        this.validateDateInput(reportType, startDate, endDate);
        // Convert string dates to Date objects
        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;
        return this.salesRepository.generateSalesReport(reportType, start, end);
    }
    async generateSalesReportExcel(reportType, startDate, endDate) {
        // Validate input
        this.validateDateInput(reportType, startDate, endDate);
        // Convert string dates to Date objects
        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;
        return this.salesRepository.exportSalesReportToExcel(reportType, start, end);
    }
    validateDateInput(reportType, startDate, endDate) {
        if (reportType === 'custom') {
            if (!startDate || !endDate) {
                throw new Error('Start and end dates are required for custom report');
            }
            const start = new Date(startDate);
            const end = new Date(endDate);
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                throw new Error('Invalid date format');
            }
            if (start > end) {
                throw new Error('Start date must be before end date');
            }
        }
    }
}
exports.AdminSalesInteractor = AdminSalesInteractor;
//# sourceMappingURL=adminSalesInteractor.js.map