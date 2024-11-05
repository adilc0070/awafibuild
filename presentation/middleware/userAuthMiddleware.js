"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwtService_1 = require("../../application/services/jwtService");
// Create an instance of your JWT service
const jwtService = new jwtService_1.JWT();
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const { payload, message } = jwtService.verifyToken(token);
    console.log(message);
    if (!payload) {
        return res.status(403).json({ status: false, message });
    }
    req.user = { id: payload.id };
    next();
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=userAuthMiddleware.js.map