"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoute.ts
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userInteractor_1 = require("../../application/interactor/userInteractor");
const userRepo_1 = require("../../infrastructure/repositories/userRepo");
const bcryptService_1 = require("../../application/services/bcryptService");
const userValidation_1 = require("../middleware/userValidation");
const userAuthMiddleware_1 = require("../middleware/userAuthMiddleware");
const jwtService_1 = require("../../application/services/jwtService");
const emailService_1 = __importDefault(require("../../application/services/emailService"));
const addressRepository_1 = require("../../infrastructure/repositories/addressRepository");
const userRoute = express_1.default.Router();
// Create instances of services and repositories
const hashedPassword = new bcryptService_1.HashPassword();
const userRepo = new userRepo_1.UserRepo();
const jwt = new jwtService_1.JWT();
const email = new emailService_1.default();
const addressRepo = new addressRepository_1.AddressRepo();
const userInteractor = new userInteractor_1.UserInteractor(userRepo, hashedPassword, jwt, email, addressRepo);
const userController = new userController_1.UserController(userInteractor);
// Routes
userRoute.post('/', userController.userLogin.bind(userController));
userRoute.post('/register', userValidation_1.validateUserInput, userController.userRegister.bind(userController));
userRoute.post('/otpVerify', userController.otpVerify.bind(userController));
userRoute.get('/profile', userAuthMiddleware_1.verifyToken, userController.userProfile.bind(userController));
userRoute.patch('/edit', userAuthMiddleware_1.verifyToken, userController.editProfile.bind(userController));
userRoute.patch('/change-password', userAuthMiddleware_1.verifyToken, userController.changePassword.bind(userController));
userRoute.post('/add-address', userAuthMiddleware_1.verifyToken, userController.addUserAddress.bind(userController));
userRoute.post('/edit-address', userAuthMiddleware_1.verifyToken, userController.updateUserAddress.bind(userController));
exports.default = userRoute;
//# sourceMappingURL=userRoute.js.map