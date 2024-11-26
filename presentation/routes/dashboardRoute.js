"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboardController_1 = __importDefault(require("../controllers/dashboardController"));
const dashboardInteractor_1 = __importDefault(require("../../application/interactor/dashboardInteractor"));
const dashboardRepository_1 = __importDefault(require("../../infrastructure/repositories/dashboardRepository"));
const checkoutModel_1 = require("../../infrastructure/model/checkoutModel");
const dashboardRoute = express_1.default.Router();
const checkoutRepo = new dashboardRepository_1.default(checkoutModel_1.CheckoutModel);
const dashboardInteractor = new dashboardInteractor_1.default(checkoutRepo);
const dashboardController = new dashboardController_1.default(dashboardInteractor);
dashboardRoute.get('/orders', dashboardController.dashTotalOrders.bind(dashboardController));
dashboardRoute.get('/revenue', dashboardController.dashTotalRevenue.bind(dashboardController));
dashboardRoute.get('/sales-report', dashboardController.salesReport.bind(dashboardController));
dashboardRoute.get('/top-Selling', dashboardController.topSellings.bind(dashboardController));
exports.default = dashboardRoute;
//# sourceMappingURL=dashboardRoute.js.map