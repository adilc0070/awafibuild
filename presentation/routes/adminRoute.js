"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const adminInteractor_1 = require("../../application/interactor/adminInteractor");
const userRepo_1 = require("../../infrastructure/repositories/userRepo");
const jwtService_1 = require("../../application/services/jwtService");
const adminAuthMiddleware_1 = require("../middleware/adminAuthMiddleware");
const userRepository = new userRepo_1.UserRepo();
const jwt = new jwtService_1.JWT();
const adminInteractor = new adminInteractor_1.AdminInteractor(userRepository, jwt);
const adminController = new adminController_1.AdminController(adminInteractor);
const adminRoute = express_1.default.Router();
adminRoute.post('/login', adminController.adminLogin.bind(adminController));
//auth routes used middleware
adminRoute.use(adminAuthMiddleware_1.verifyAdminToken);
adminRoute.get('/allUser', adminController.allUsers.bind(adminController));
adminRoute.post('/blockUser', adminController.blockUser.bind(adminController));
adminRoute.post('/unblockUser', adminController.unblockUser.bind(adminController));
//dash data
exports.default = adminRoute;
//# sourceMappingURL=adminRoute.js.map