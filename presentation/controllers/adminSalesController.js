"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSalesController = void 0;
class AdminSalesController {
    salesInteractor;
    constructor(salesInteractor) {
        this.salesInteractor = salesInteractor;
    }
    async getSalesReport(req, res) {
        try {
            const { reportType, startDate, endDate } = req.query;
            //   await new Promise((resolve) => setTimeout(resolve, 5000));
            const salesReport = await this.salesInteractor.generateSalesReport(reportType, startDate, endDate);
            res.json(salesReport);
        }
        catch (error) {
            this.handleError(res, error);
        }
    }
    async downloadSalesReport(req, res) {
        try {
            const { reportType, startDate, endDate } = req.query;
            //   await new Promise((resolve) => setTimeout(resolve, 5000));
            const excelBuffer = await this.salesInteractor.generateSalesReportExcel(reportType, startDate, endDate);
            res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename=sales_report_${reportType}.xlsx`);
            res.send(excelBuffer);
        }
        catch (error) {
            this.handleError(res, error);
        }
    }
    handleError(res, error) {
        console.error('Sales Report Error:', error);
        res.status(error.status || 500).json({
            message: error.message || 'Internal Server Error',
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
}
exports.AdminSalesController = AdminSalesController;
//# sourceMappingURL=adminSalesController.js.map