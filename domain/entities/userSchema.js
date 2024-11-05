"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// src/domain/entities/userSchema.ts
class User {
    id;
    name;
    email;
    password;
    createdAt;
    updatedAt;
    constructor(id, name, email, password, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    // Factory method to create a new user
    static newUser(id, name, email, password) {
        const now = new Date();
        return new User(id, name, email, password, now, // createdAt
        now // updatedAt
        );
    }
}
exports.User = User;
//# sourceMappingURL=userSchema.js.map