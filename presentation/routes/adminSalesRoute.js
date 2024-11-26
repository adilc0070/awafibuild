"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAdminSalesRoutes = setupAdminSalesRoutes;
// src/presentation/routes/adminSalesRoute.ts
const express_1 = __importDefault(require("express"));
const adminSalesController_1 = require("../controllers/adminSalesController");
const adminSalesInteractor_1 = require("../../application/interactor/adminSalesInteractor");
const adminSalesRepo_1 = require("../../infrastructure/repositories/adminSalesRepo");
// import { authMiddleware } from '../../middleware/authMiddleware'; // Assuming you have this
function setupAdminSalesRoutes() {
    const router = express_1.default.Router();
    // Create instances
    const salesRepository = new adminSalesRepo_1.AdminSalesRepository();
    const salesInteractor = new adminSalesInteractor_1.AdminSalesInteractor(salesRepository);
    const salesController = new adminSalesController_1.AdminSalesController(salesInteractor);
    // Routes
    router.get('/report', 
    // authMiddleware,  // Add your authentication middleware
    (req, res) => salesController.getSalesReport(req, res));
    router.get('/report/download', 
    // authMiddleware,  // Add your authentication middleware
    (req, res) => salesController.downloadSalesReport(req, res));
    return router;
}
//# sourceMappingURL=adminSalesRoute.js.map