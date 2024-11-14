"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryInteractor = void 0;
class CategoryInteractor {
    categoryRepo; // Use the category repository
    cloudinaryService;
    constructor(categoryRepo, cloudinaryService) {
        this.categoryRepo = categoryRepo;
        this.cloudinaryService = cloudinaryService;
    }
    // Add a new category
    async addCategory(data) {
        // console.log("data",data)
        const { name } = data;
        const isAvailable = await this.categoryRepo.findByName(name);
        if (isAvailable) {
            return { message: "Category always in your bucket", status: 409 };
        }
        if (data && data.photo) {
            const uploadImage = await this.cloudinaryService.uploadCategoryImage(data.photo);
            data.photo = uploadImage.secure_url;
        }
        const category = await this.categoryRepo.addCategory(data); // Use repository method
        return this.mapToDTO(category);
    }
    // Get all categories
    async getAllCategories(page, limit) {
        const categoriesResponse = await this.categoryRepo.getAllCategories(page, limit); // Use repository method
        const categories = categoriesResponse.data.map(this.mapToDTO);
        return { data: categories, totalPages: categoriesResponse.totalPages };
    }
    async getByName(page, limit, name) {
        const categoriesResponse = await this.categoryRepo.findbyNameSpellings(page, limit, name); // Use repository method
        const categories = categoriesResponse.data.map(this.mapToDTO);
        return { data: categories, totalPages: categoriesResponse.totalPages };
    }
    // Get all listed categories
    async getListedCategories(page, limit) {
        try {
            const categoriesResponse = await this.categoryRepo.getListedCategories(page, limit);
            const categories = categoriesResponse.data.map(this.mapToDTO);
            return { data: categories, totalPages: categoriesResponse.totalPages };
        }
        catch (error) {
            console.error('Error fetching listed categories:', error);
            throw new Error('Failed to fetch listed categories');
        }
    }
    // Get a category by ID
    async getCategoryById(id) {
        const category = await this.categoryRepo.getCategoryById(id); // Use repository method
        return category && !category.isDeleted ? this.mapToDTO(category) : null;
    }
    // Update a category
    async updateCategory(id, data) {
        const { name, photo } = data;
        if (name) {
            const isAvailable = await this.categoryRepo.findByNameNotId(id, name);
            if (isAvailable) {
                return { message: "Category always in your bucket", status: 409 };
            }
        }
        if (photo) {
            const uploadImage = await this.cloudinaryService.uploadCategoryImage(photo);
            data.photo = uploadImage.secure_url;
        }
        const updatedCategory = await this.categoryRepo.updateCategory(id, data); // Use repository method
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
            _id: category._id,
            name: category.name,
            photo: category.photo,
            description: category.description,
            isListed: category.isListed,
            isDeleted: category.isDeleted,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        };
    }
}
exports.CategoryInteractor = CategoryInteractor;
//# sourceMappingURL=categoryInteractor.js.map