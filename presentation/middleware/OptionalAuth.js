"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = void 0;
const jwtService_1 = require("../../application/services/jwtService");
// Create an instance of your JWT service
const jwtService = new jwtService_1.JWT();
// Middleware that adds user ID to req if a valid token is provided, without interrupting the flow
const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        const token = authHeader.split(' ')[1];
        const { payload, message } = jwtService.verifyToken(token);
        console.log(message);
        // Attach user ID to req if token is valid
        if (payload) {
            req.user = { id: payload.id };
        }
    }
    // Continue to the next middleware or route handler, even if the token is missing or invalid
    next();
};
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=OptionalAuth.js.map