"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInteractor = void 0;
const otpService_1 = require("../services/otpService");
const redisServices_1 = __importDefault(require("../../application/services/redisServices"));
class UserInteractor {
    userRepository;
    bcrypt;
    jwt;
    emailService;
    addressRepo;
    constructor(userRepository, bcrypt, jwt, emailService, addressRepo) {
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
        this.jwt = jwt;
        this.emailService = emailService;
        this.addressRepo = addressRepo;
    }
    //=-========================================login===============
    async login(email, password) {
        try {
            const userData = await this.userRepository.findUserEmail(email);
            if (!userData) {
                return { success: false, message: "User not found" };
            }
            const userLogin = await this.bcrypt.comparePassword(password, userData.password);
            if (userLogin) {
                const accessToken = this.jwt.generateToken({ id: userData.id }, "1h");
                return { success: true, message: "Login successful", data: accessToken };
            }
            else {
                return { success: false, message: "Invalid credentials" };
            }
        }
        catch (error) {
            console.log("error", error);
            throw new Error("Login failed");
        }
    }
    //=-========================================registration========================
    async registerUser(email, name, password, phone) {
        try {
            await redisServices_1.default.deleteData(email);
            const existingUser = await redisServices_1.default.getData(email);
            if (existingUser) {
                return { success: false, message: "User already  under registration process" };
            }
            const registeredUser = await this.userRepository.findUserEmail(email);
            if (registeredUser) {
                return { success: false, message: "User already present" };
            }
            // Generate OTP
            const otp = (0, otpService_1.generateOTP)();
            // Store user data along with OTP in Redis
            const userData = { email, name, password, phone, otp };
            await redisServices_1.default.setData(email, userData, 300); // Set data with a 5-minute expiration (300 seconds)
            // sendEmail--------------------
            await this.emailService.OtpEmail(email, otp);
            const dataSet = {
                email
            };
            return { success: true, data: dataSet, message: `User registcujuimration initiated, please verify OTP.${otp}` };
        }
        catch (error) {
            throw new Error("Registration failed");
        }
    }
    //=-========================================verifyOtp========================
    async verifyOtp(email, otp) {
        try {
            // Retrieve user data from Redis
            const userData = await redisServices_1.default.getData(email);
            if (!userData) {
                return { success: false, message: "User data not found or expired" };
            }
            // Validate the OTP
            if (userData.otp === otp) {
                const hashedPassword = await this.bcrypt.encryptPassword(userData.password);
                const newUser = {
                    name: userData.name,
                    email: userData.email,
                    password: hashedPassword,
                    phone: userData.phone,
                    isVerified: true
                };
                await this.userRepository.registerUser(newUser);
                await redisServices_1.default.deleteData(email);
                return { success: true, message: "User registered successfully." };
            }
            else {
                return { success: false, message: "Invalid OTP." };
            }
        }
        catch (error) {
            console.log(error);
            throw new Error("OTP verification failed.");
        }
    }
    //-------------------- Edit Profile----------------------------------
    async editProfile(id, email, name, phone) {
        try {
            const userData = await this.userRepository.findUser(id);
            if (!userData) {
                return null;
            }
            await this.userRepository.updateProfile(id, email, name, phone);
            return { success: true };
        }
        catch (error) {
        }
    }
    async profileData(id) {
        const user = await this.userRepository.findUser(id);
        if (!user) {
            return null;
        }
        return this.mapToUserProfileDTO(user);
    }
    mapToUserProfileDTO(user) {
        return {
            name: user.name,
            email: user.email,
            phone: user.phone,
        };
    }
    async changeUserPassword(id, password, newPassword) {
        const userData = await this.userRepository.findUser(id);
        if (!userData) {
            return null;
        }
        const userLogin = await this.bcrypt.comparePassword(password, userData.password);
        if (userLogin) {
            const hashedPassword = await this.bcrypt.encryptPassword(newPassword);
            await this.userRepository.updatePassword(id, hashedPassword);
            return { status: true, message: "change password succesfully" };
        }
    }
    async addUserAddress(id, address) {
        try {
            const result = await this.addressRepo.addAddress(id, address);
            if (!result.status) {
                return { status: false, message: result.message };
            }
            return { status: true, message: "User address added successfully" };
        }
        catch (error) {
            console.error("Error in addUserAddress:", error);
            return { status: false, message: "An error occurred while adding the user address" };
        }
    }
    async editUserAddress(id, newAddress) {
        try {
            const result = await this.addressRepo.editAddress(id, newAddress);
            if (!result.status) {
                return { status: false, message: result.message };
            }
            return { status: true, message: "User address added successfully" };
        }
        catch (error) {
            console.error("Error in addUserAddress:", error);
            return { status: false, message: "An error occurred while adding the user address" };
        }
    }
}
exports.UserInteractor = UserInteractor;
//# sourceMappingURL=userInteractor.js.map