"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const baseRepository_1 = require("./baseRepository");
class CategoryRepository extends baseRepository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    // Correct the DTO used in addCategory
    async addCategory(data) {
        return await super.create(data);
    }
    async getAllCategories(page, limit) {
        const skip = (page - 1) * limit;
        const totalCategories = await this.model.countDocuments();
        const categories = await this.model.find({ isDeleted: false }).skip(skip).limit(limit);
        return {
            data: categories,
            totalPages: Math.ceil(totalCategories / limit)
        };
    }
    async findbyNameSpellings(page, limit, name) {
        const skip = (page - 1) * limit;
        // Use regex to count total categories that match the spelling criteria
        const totalCategories = await this.model.countDocuments({
            isDeleted: false,
            name: { $regex: `^${name}`, $options: 'i' } // Match categories starting with the given name (case-insensitive)
        });
        // Fetch categories that match the spelling criteria
        const categories = await this.model.find({
            isDeleted: false,
            name: { $regex: `^${name}`, $options: 'i' } // Match categories starting with the given name (case-insensitive)
        }).skip(skip).limit(limit);
        return {
            data: categories,
            totalPages: Math.ceil(totalCategories / limit) // Calculate total pages
        };
    }
    async getListedCategories(page, limit) {
        const skip = (page - 1) * limit;
        const totalCategories = await this.model.countDocuments({ isListed: true, isDeleted: false });
        const categories = await this.model.find({ isListed: true, isDeleted: false })
            .skip(skip)
            .limit(limit);
        return {
            data: categories,
            totalPages: Math.ceil(totalCategories / limit)
        };
    }
    async findByName(name) {
        const regex = new RegExp(`^${name}$`, 'i');
        return await super.findOne({ name: regex });
    }
    async findByNameNotId(id, name) {
        const regex = new RegExp(`^${name}$`, 'i');
        return await super.findOne({
            _id: { $ne: id },
            name: { $regex: regex }
        });
    }
    async getCategoryById(id) {
        return await super.findById(id);
    }
    // Correct the DTO used in updateCategory
    async updateCategory(id, data) {
        return await super.update(id, data);
    }
    // Correct the return type to boolean
    async deleteCategory(id) {
        const result = await super.delete(id);
        return result !== null; // Assuming `super.delete` returns null when no document is found
    }
}
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=categoryRepository.js.map