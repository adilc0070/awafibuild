"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    userInteractor;
    constructor(userInteractor) {
        this.userInteractor = userInteractor;
    }
    //=-========================================controller login===============
    async userLogin(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await this.userInteractor.login(email, password);
            if (result.success) {
                return res
                    .status(200)
                    .json({ status: true, message: result.message, token: result.data });
            }
            else {
                return res.status(401).json({ status: false, message: result.message });
            }
        }
        catch (error) {
            next(error);
        }
    }
    //=========================================register====================
    async userRegister(req, res, next) {
        try {
            const { email, password, phone, name } = req.body;
            const result = await this.userInteractor.registerUser(email, name, password, phone);
            if (result.success) {
                return res
                    .status(200)
                    .json({ status: true, message: result.message, otp: result.otp });
            }
            else {
                return res.status(401).json({ status: false, message: result.message });
            }
        }
        catch (error) {
            next(error);
        }
    }
    //=-========================================verify otp====================
    async otpVerify(req, res, next) {
        try {
            const { email, otp } = req.body;
            const result = await this.userInteractor.verifyOtp(email, otp);
            // Handle the response based on the result of OTP verification
            if (result.success) {
                return res.status(200).json({ status: true, message: result.message });
            }
            else {
                return res.status(400).json({ status: false, message: result.message });
            }
        }
        catch (err) {
            next(err);
        }
    }
    //  ==========================================Profile page section==================================
    async editProfile(req, res, next) {
        try {
            const { email, name, phone } = req.body;
            const id = req.user?.id;
            if (!id) {
                return res.status(400).json({ message: "User ID not found in token" });
            }
            const result = await this.userInteractor.editProfile(id, email, name, phone);
            if (result.success) {
                return res.status(200).json({ status: true, message: "user data update" });
            }
            else {
                return res.status(400).json({ status: false, message: result.message });
            }
        }
        catch (err) {
            next(err);
        }
    }
    //  ======================================== user profile=======================================
    async userProfile(req, res, next) {
        try {
            console.log("====================================");
            console.log(req.user);
            const id = req.user?.id;
            if (!id) {
                return res.status(400).json({ status: false, message: "User ID not found in token" });
            }
            console.log("Decoded Payload ID:", id);
            // Use the id in profileData (ensured to be a string now)
            const profileData = await this.userInteractor.profileData(id);
            return res.status(200).json({ status: true, profileData });
        }
        catch (error) {
            next(error);
        }
    }
    //  ======================================== user profile=======================================
    async changePassword(req, res, next) {
        try {
            const { password, newPassword } = req.body;
            const id = req.user?.id;
            if (!id) {
                return res.status(400).json({ message: "User ID not found in token" });
            }
            const changePassword = await this.userInteractor.changeUserPassword(id, password, newPassword);
            if (!changePassword) {
                return res
                    .status(401)
                    .json({ status: false, message: "password missmatch" });
            }
            return res.status(200).json(changePassword);
        }
        catch (error) {
            next(error);
        }
    }
    async addUserAddress(req, res, next) {
        try {
            const id = req.user?.id;
            if (!id) {
                return res.status(400).json({ message: "User ID not found in token" });
            }
            const userAddress = await this.userInteractor.addUserAddress(id, req.body);
            if (userAddress.status) {
                return res.status(200).json({ status: true, message: userAddress.message });
            }
            else {
                return res.status(400).json({ status: false, message: userAddress.message });
            }
        }
        catch (error) {
            console.error("Error in addUserAddress controller:", error);
            next(error);
        }
    }
    async updateUserAddress(req, res, next) {
        try {
            const id = req.user?.id;
            if (!id) {
                return res.status(400).json({ message: "User ID not found in token" });
            }
            const userEditAddress = await this.userInteractor.editUserAddress(id, req.body);
            if (userEditAddress.status) {
                return res.status(200).json({ status: true, message: userEditAddress.message });
            }
            else {
                return res.status(400).json({ status: false, message: userEditAddress.message });
            }
        }
        catch (error) {
            console.error("Error in addUserAddress controller:", error);
            next(error);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map