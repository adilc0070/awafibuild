"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    // Create a new entity
    async create(data) {
        const createdEntity = new this.model(data);
        return await createdEntity.save();
    }
    // Find multiple entities by filter query
    async find(filter) {
        return await this.model.find(filter);
    }
    // Find one entity by filter query
    async findOne(filter) {
        return await this.model.findOne(filter);
    }
    // Find an entity by its ID
    async findById(id) {
        return await this.model.findById(id);
    }
    // Update an entity by its ID and return the updated entity
    async update(id, update) {
        return await this.model.findByIdAndUpdate(id, update, { new: true });
    }
    // Update one entity based on filter query and return the updated entity
    async updateOne(filter, update) {
        return await this.model.findOneAndUpdate(filter, update, { new: true });
    }
    // Delete an entity by its ID
    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=baseRepository.js.map