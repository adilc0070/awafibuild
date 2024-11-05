"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserInput = void 0;
const joi_1 = __importDefault(require("joi"));
// validation schema
const schema = joi_1.default.object({
    email: joi_1.default.string().email().trim().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
    }),
    name: joi_1.default.string().trim().required().messages({
        'any.required': 'Name is required',
    }), // Added validation for name with trimming
    password: joi_1.default.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required',
    }),
    phone: joi_1.default.number().required().messages({
        'any.required': 'Phone number is required',
    }), // Added validation for phone
});
// validation middleware
const validateUserInput = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        console.log("error", error);
        return res.status(400).json({ status: false, message: error.details[0].message });
    }
    next();
};
exports.validateUserInput = validateUserInput;
//# sourceMappingURL=userValidation.js.map