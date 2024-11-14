"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryRepository = void 0;
const baseRepository_1 = require("./baseRepository");
class SubCategoryRepository extends baseRepository_1.BaseRepository {
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
        const category = await this.model.find().skip(skip).limit(limit);
        return {
            data: category,
            totalPages: Math.ceil(totalCategories / limit)
        };
    }
    async findCategoryName(page, limit, name) {
        const skip = (page - 1) * limit;
        // Count total categories that match the regex search
        const totalCategories = await this.model.countDocuments({
            name: { $regex: `^${name}`, $options: 'i' }
        });
        // Fetch categories with prefix matching prioritized
        const categories = await this.model.find({
            name: { $regex: `^${name}`, $options: 'i' }
        })
            .skip(skip) // Pagination
            .limit(limit) // Limit the number of results
            .exec();
        return {
            data: categories,
            totalPages: Math.ceil(totalCategories / limit)
        };
    }
    async getListedCategories(mainCategoryId, page, limit) {
        const skip = (page - 1) * limit;
        const totalCategories = await this.model.countDocuments({ isListed: true, isDeleted: false, mainCategory: mainCategoryId });
        const category = await this.model.find({ isListed: true, isDeleted: false, mainCategory: mainCategoryId }).skip(skip).limit(limit);
        return {
            data: category,
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
exports.SubCategoryRepository = SubCategoryRepository;
//# sourceMappingURL=subCategoryRepository.js.map