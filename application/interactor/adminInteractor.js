"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminInteractor = void 0;
let email = process.env.ADMIN_EMAIL;
let password = process.env.ADMIN_PASSWORD;
class AdminInteractor {
    userRepository;
    jwt;
    checkoutRepo;
    constructor(userRepository, jwt, checkoutRepo) {
        this.userRepository = userRepository;
        this.jwt = jwt;
        this.checkoutRepo = checkoutRepo;
    }
    async logIn(data) {
        if (data.email === email && password === data.password) {
            console.log("true");
            const accessToken = this.jwt.generateToken({ id: data.email }, "30d");
            return { success: true, message: "Login successful", data: accessToken };
        }
        else {
            console.log("false");
            return { success: false, message: "Invalid credentials" };
        }
    }
    async usersData() {
        try {
            const userData = await this.userRepository.findAll(); // Fetch users as UserDTO[]
            console.log("userData", userData);
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
    async totalOrders() {
        try {
            const result = await this.checkoutRepo.viewAllorders();
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async totalRevenue(period) {
        try {
            const result = await this.checkoutRepo.viewRevenue(period);
            return result;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async salesReport(reportType, startDate, endDate) {
        try {
            console.log('====================================');
            console.log('Generating sales report with parameters:', { reportType, startDate, endDate });
            console.log('====================================');
            // Ensure that all necessary parameters are provided
            if (!reportType || !startDate || !endDate) {
                throw new Error("Missing required parameters for generating sales report.");
            }
            // Call the repository method to generate the report
            const result = await this.checkoutRepo.generateProductSalesReport(startDate, endDate, reportType);
            console.log("result", result);
            // Handle or return the result as needed
            return result;
        }
        catch (error) {
            console.error('Error generating sales report:', error);
            // Optionally rethrow the error or handle it as needed
            throw error;
        }
    }
}
exports.AdminInteractor = AdminInteractor;
//# sourceMappingURL=adminInteractor.js.map