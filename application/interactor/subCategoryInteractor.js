"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryInteractor = void 0;
class SubCategoryInteractor {
    categoryRepo; // Use the category repository
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    // Add a new category
    async addCategory(data) {
        // console.log("data",data)
        const { name } = data;
        const isAvailable = await this.categoryRepo.findByName(name);
        if (isAvailable) {
            return { message: "Category always in your bucket", status: 409 };
        }
        const category = await this.categoryRepo.addCategory(data); // Use repository method
        return this.mapToDTO(category);
    }
    // Get all categories
    async getAllCategories(page, limit) {
        const categoryResponse = await this.categoryRepo.getAllCategories(page, limit); // Use repository method
        const categories = categoryResponse.data.map(this.mapToDTO);
        return { data: categories, totalPages: categoryResponse.totalPages };
    }
    async searchByname(page, limit, name) {
        const categoryResponse = await this.categoryRepo.findCategoryName(page, limit, name); // Use repository method
        const categories = categoryResponse.data.map(this.mapToDTO);
        return { data: categories, totalPages: categoryResponse.totalPages };
    }
    // Get all listed categories
    async getListedCategories(mainCategoryId, page, limit) {
        const categoryResponse = await this.categoryRepo.getListedCategories(mainCategoryId, page, limit); // Use repository method
        const categories = categoryResponse.data.map(this.mapToDTO);
        return { data: categories, totalPages: categoryResponse.totalPages };
    }
    // Get a category by ID
    async getCategoryById(id) {
        const category = await this.categoryRepo.getCategoryById(id); // Use repository method
        return category && !category.isDeleted ? this.mapToDTO(category) : null;
    }
    // Update a category
    async updateCategory(categoryId, data) {
        if (data.name) {
            const isAvailable = await this.categoryRepo.findByNameNotId(categoryId, data.name);
            if (isAvailable) {
                return { message: "Category always in your bucket", status: 409 };
            }
        }
        const updatedCategory = await this.categoryRepo.updateCategory(categoryId, data); // Use repository method
        return updatedCategory && !updatedCategory.isDeleted ? this.mapToDTO(updatedCategory) : null;
    }
    // Soft delete a category
    async deleteCategory(id) {
        return await this.categoryRepo.deleteCategory(id); // Use repository method
    }
    // List a category
    async listById(id) {
        const category = await this.categoryRepo.getCategoryById(id); // Use repository method
        if (category && !category.isDeleted) {
            if (category.isListed) {
                throw new Error("Category is already listed.");
            }
            category.isListed = true; // List the category
            await this.categoryRepo.updateCategory(id, category); // Use repository method to update
            return { message: "Category listed successfully" };
        }
        throw new Error("Category not found.");
    }
    // Unlist a category
    async unListById(id) {
        const category = await this.categoryRepo.getCategoryById(id); // Use repository method
        if (category && !category.isDeleted) {
            if (!category.isListed) {
                throw new Error("Category is already unlisted.");
            }
            category.isListed = false; // Unlist the category
            await this.categoryRepo.updateCategory(id, category); // Use repository method to update
            return { message: "Category unlisted successfully" };
        }
        throw new Error("Category not found.");
    }
    // Map Category to ProductDTO
    mapToDTO(category) {
        return {
            _id: category._id.toString(),
            name: category.name,
            description: category.description,
            mainCategory: category.mainCategory,
            isListed: category.isListed,
            isDeleted: category.isDeleted,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        };
    }
}
exports.SubCategoryInteractor = SubCategoryInteractor;
//# sourceMappingURL=subCategoryInteractor.js.map