"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRepository = void 0;
const baseRepository_1 = require("./baseRepository");
const date_fns_1 = require("date-fns");
class DashboardRepository extends baseRepository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async topSellingProduct() {
        const result = await this.model.aggregate([
            { $match: { orderStatus: { $in: ['delivered', 'shipped'] } } },
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.productId",
                    totalQuantity: { $sum: "$items.quantity" },
                    productName: { $first: "$items.name" },
                    images: { $first: "$items.images" }
                }
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: 5 }
        ]);
        return result;
    }
    async viewAllOrders() {
        try {
            const result = await this.model.aggregate([
                {
                    $match: {
                        orderStatus: { $in: ['delivered', 'shipped', 'returned', 'processing'] }
                    }
                },
                {
                    $group: {
                        _id: "$orderStatus",
                        totalCount: { $sum: 1 },
                        totalAmount: { $sum: "$amount" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        orderStatus: "$_id",
                        totalCount: 1,
                        totalAmount: 1
                    }
                }
            ]);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async viewRevenue(period) {
        try {
            const now = new Date();
            let matchCondition = {
                paymentStatus: 'completed',
                orderStatus: 'delivered',
            };
            let groupBy;
            let startDate;
            let endDate;
            let labels = [];
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December',
            ];
            if (period === 'day') {
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
                endDate = (0, date_fns_1.endOfDay)(now);
                matchCondition.orderPlacedAt = { $gte: startDate, $lte: endDate };
                groupBy = { dayOfWeek: { $dayOfWeek: '$orderPlacedAt' } };
                // Labels for days of the week
                labels = [...Array(7)].map((_, i) => days[(startDate.getDay() + i) % 7]);
            }
            else if (period === 'month') {
                startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);
                endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // End of current month
                matchCondition.orderPlacedAt = { $gte: startDate, $lte: endDate };
                groupBy = { month: { $month: '$orderPlacedAt' }, year: { $year: '$orderPlacedAt' } };
                // Labels for months
                labels = [...Array(12)].map((_, i) => {
                    const date = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
                    return months[date.getMonth()];
                });
            }
            else if (period === 'year') {
                startDate = new Date(now.getFullYear() - 3, 0, 1);
                endDate = (0, date_fns_1.endOfYear)(now);
                matchCondition.orderPlacedAt = { $gte: startDate, $lte: endDate };
                groupBy = { year: { $year: '$orderPlacedAt' } };
                // Labels for years
                labels = [...Array(4)].map((_, i) => `${startDate.getFullYear() + i}`);
            }
            // Aggregation pipeline
            const data = await this.model.aggregate([
                { $match: matchCondition },
                {
                    $group: {
                        _id: groupBy,
                        totalRevenue: { $sum: '$amount' },
                        count: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        period: '$_id',
                        totalRevenue: 1,
                        count: 1,
                    },
                },
            ]);
            // Calculate total revenue
            const totalRevenue = data.reduce((sum, item) => sum + item.totalRevenue, 0);
            // Map data to include all labels, filling gaps with default values
            const result = labels.map((label, index) => {
                const found = data.find((item) => {
                    if (period === 'day') {
                        return days[item.period.dayOfWeek - 1] === label; // Map dayOfWeek to name
                    }
                    else if (period === 'month') {
                        return (item.period.month - 1 ===
                            (startDate.getMonth() + index) % 12 &&
                            item.period.year ===
                                new Date(startDate.getFullYear(), startDate.getMonth() + index, 1).getFullYear());
                    }
                    else if (period === 'year') {
                        return label === `${item.period.year}`;
                    }
                });
                return found || { period: label, totalRevenue: 0, count: 0 };
            });
            // Replace numeric dayOfWeek in period with day name
            if (period === 'day') {
                result.forEach((item) => {
                    if (typeof item.period === 'object' && item.period.dayOfWeek) {
                        item.period = days[item.period.dayOfWeek - 1]; // Replace dayOfWeek number with name
                    }
                });
            }
            if (period === 'month') {
                result.forEach((item) => {
                    if (typeof item.period === 'object' && item.period.month) {
                        item.period = months[item.period.month - 1]; // Replace month number with name
                    }
                });
            }
            return { totalRevenue, data: result };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async generateProductSalesReport(startDate, endDate, interval) {
        try {
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
exports.DashboardRepository = DashboardRepository;
exports.default = DashboardRepository;
//# sourceMappingURL=dashboardRepository.js.map