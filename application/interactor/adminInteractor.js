"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminInteractor = void 0;
const env_1 = __importDefault(require("../../config/env"));
let email = env_1.default.ADMIN_EMAIL;
let password = env_1.default.ADMIN_PASSWORD;
class AdminInteractor {
    userRepository;
    jwt;
    constructor(userRepository, jwt) {
        this.userRepository = userRepository;
        this.jwt = jwt;
    }
    async logIn(data) {
        if (data.email === email && password === data.password) {
            const accessToken = this.jwt.generateToken({ id: data.email }, "30d");
            return { success: true, message: "Login successful", data: accessToken };
        }
        else {
            return { success: false, message: "Invalid credentials" };
        }
    }
    async usersData() {
        try {
            const userData = await this.userRepository.findAll(); // Fetch users as UserDTO[]
            return {
                status: true,
                data: userData,
            };
        }
        catch (error) {
            console.error("Error fetching user data:", error);
            return {
                status: false,
                data: [], // Handle no user data case
                message: error instanceof Error ? error.message : "Unknown error occurred",
            };
        }
    }
    async blockUser(email) {
        try {
            const user = await this.userRepository.findUserEmail(email);
            if (!user) {
                console.log('User not found');
                return { success: false, message: 'User not found' };
            }
            console.log('User found:', user);
            user.isBlocked = true;
            await user.save();
            console.log('User successfully blocked');
            return { success: true };
        }
        catch (error) {
            console.error("Error blocking user:", error);
            return { success: false };
        }
    }
    async unblockUser(email) {
        try {
            const user = await this.userRepository.findUserEmail(email);
            if (!user) {
                console.log('User not found');
                return { success: false, message: 'User not found' };
            }
            console.log('User foundunblock', user);
            user.isBlocked = false;
            await user.save();
            console.log('User successfully unblocked');
            return { success: true };
        }
        catch (error) {
            console.error("Error blocking user:", error);
            return { success: false };
        }
    }
}
exports.AdminInteractor = AdminInteractor;
//# sourceMappingURL=adminInteractor.js.map