"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminToken = void 0;
const jwtService_1 = require("../../application/services/jwtService");
const email = process.env.ADMIN_EMAIL; // Get the admin email from the environment variables
const jwtService = new jwtService_1.JWT();
const verifyAdminToken = (req, res, next) => {
    console.log("reached on authntication middle");
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const { payload, message } = jwtService.verifyToken(token);
    if (!payload) {
        return res.status(403).json({ status: false, message });
    }
    if (payload.id !== email) {
        return res.status(403).json({ status: false, message: 'Unauthorized: Invalid email' });
    }
    req.user = { id: payload.id };
    next();
};
exports.verifyAdminToken = verifyAdminToken;
//# sourceMappingURL=adminAuthMiddleware.js.map