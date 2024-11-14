"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWT {
    constructor() { }
    generateToken(payload, expiresIn) {
        return jsonwebtoken_1.default.sign(payload, "JWT_PRIVATE_KEY", {
            expiresIn,
        });
    }
    verifyToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, "JWT_PRIVATE_KEY");
            return {
                payload: decoded,
                message: "Authenticated",
            };
        }
        catch (error) {
            return {
                payload: null,
                message: error.message,
            };
        }
    }
    verifyRefreshToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, "JWT_PUBLIC_KEY");
            return decoded;
        }
        catch (error) {
            return null;
        }
    }
}
exports.JWT = JWT;
//# sourceMappingURL=jwtService.js.map