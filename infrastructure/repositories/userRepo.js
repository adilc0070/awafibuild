"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const userModel_1 = require("../model/userModel");
const baseRepository_1 = require("./baseRepository");
class UserRepo extends baseRepository_1.BaseRepository {
    constructor() {
        super(userModel_1.userModel);
    }
    async findUserEmail(email) {
        try {
            return await this.model.findOne({ email });
        }
        catch (error) {
            console.error("Error finding user:", error);
            throw error;
        }
    }
    async findUser(id) {
        try {
            return await this.model.findById(id);
        }
        catch (error) {
            console.error("Error finding user:", error);
            throw error;
        }
    }
    async registerUser(userData) {
        console.log("user register  repo..", userData);
        const newUser = new this.model({
            email: userData.email,
            password: userData.password,
            name: userData.name,
            phone: userData.phone
        });
        await newUser.save();
        return "registration completed";
    }
    async updatePassword(id, hashedPassword) {
        await userModel_1.userModel.updateOne({ _id: id }, { $set: { password: hashedPassword } });
    }
    async updateProfile(id, email, name, phone) {
        const updateFields = {};
        // Build update object only with defined fields
        if (email !== undefined)
            updateFields.email = email;
        if (name !== undefined)
            updateFields.name = name;
        if (phone !== undefined)
            updateFields.phone = phone;
        if (Object.keys(updateFields).length === 0) {
            throw new Error("No fields to update");
        }
        const result = await userModel_1.userModel.updateOne({ _id: id }, { $set: updateFields });
    }
    async findAll() {
        try {
            const users = await this.model.find({}); // Fetch users as IuserDocument[]
            // Map the raw Mongoose documents to UserDTO
            const userDTOs = users.map((user) => ({
                _id: user._id.toString(), // Convert ObjectId to string
                email: user.email,
                name: user.name,
                phone: user.phone,
                isBlocked: user.isBlocked,
            }));
            return userDTOs; // Return UserDTO[]
        }
        catch (error) {
            console.error("Error finding users:", error);
            throw error; // Rethrow error for further handling
        }
    }
}
exports.UserRepo = UserRepo;
//# sourceMappingURL=userRepo.js.map