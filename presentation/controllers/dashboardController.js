"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DashboardController {
    dashboardInteractor;
    constructor(dashboardInteractor) {
        this.dashboardInteractor = dashboardInteractor;
    }
    async dashTotalOrders(req, res, next) {
        try {
            const result = await this.dashboardInteractor.totalOrders();
            return res.status(200).json({ status: true, data: result });
        }
        catch (error) {
            console.error('Error in dashTotalOrders:', error);
            return res.status(500).json({ status: false, message: 'Internal server error' });
        }
    }
    async dashTotalRevenue(req, res, next) {
        try {
            let period;
            if (typeof req.query.period === 'string') {
                period = req.query.period;
            }
            else {
                period = undefined;
            }
            const result = await this.dashboardInteractor.totalRevenue(period);
            return res.json(result);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async topSellings(req, res, next) {
        try {
            const result = await this.dashboardInteractor.topSellings();
            return res.json(result);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async salesReport(req, res, next) {
        try {
            const reportType = req.query.reportType;
            const startDate = new Date(req.query.startDate);
            const endDate = new Date(req.query.endDate);
            // Validate the parsed dates
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                throw new Error("Invalid date format for startDate or endDate.");
            }
            const result = await this.dashboardInteractor.salesReport(reportType, startDate, endDate);
            res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            console.error("Error in salesReport:", error);
            next(error); // Forward the error to error-handling middleware
        }
    }
}
exports.default = DashboardController;
//# sourceMappingURL=dashboardController.js.map