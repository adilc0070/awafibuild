"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./presentation/routes/userRoute"));
const productRoute_1 = __importDefault(require("./presentation/routes/productRoute"));
const cartRoute_1 = __importDefault(require("./presentation/routes/cartRoute"));
const categoryRoute_1 = __importDefault(require("./presentation/routes/categoryRoute"));
const bannerRoute_1 = __importDefault(require("./presentation/routes/bannerRoute"));
const dbConfig_1 = require("./infrastructure/database/dbConfig");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const adminRoute_1 = __importDefault(require("./presentation/routes/adminRoute"));
const logger_1 = __importDefault(require("./utilities/logger"));
const wishlistRoute_1 = __importDefault(require("./presentation/routes/wishlistRoute"));
const checkoutRoute_1 = __importDefault(require("./presentation/routes/checkoutRoute"));
const userAuthMiddleware_1 = require("./presentation/middleware/userAuthMiddleware");
const reviewRoute_1 = __importDefault(require("./presentation/routes/reviewRoute"));
const orderRoute_1 = __importDefault(require("./presentation/routes/orderRoute"));
const subCategoryRoute_1 = __importDefault(require("./presentation/routes/subCategoryRoute"));
const startServer = async () => {
    try {
        await (0, dbConfig_1.connectDB)();
        const app = (0, express_1.default)();
        app.use((0, morgan_1.default)("dev"));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        // CORS configuration
        app.use((0, cors_1.default)({
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
            credentials: true,
        }));
        app.use('/api/user', userRoute_1.default);
        app.use('/api/admin', adminRoute_1.default);
        app.use('/api/orders', orderRoute_1.default);
        app.use('/api/products', productRoute_1.default);
        app.use('/api/cart', userAuthMiddleware_1.verifyToken, cartRoute_1.default);
        app.use('/api/review', userAuthMiddleware_1.verifyToken, reviewRoute_1.default);
        app.use('/api/wishlist', userAuthMiddleware_1.verifyToken, wishlistRoute_1.default);
        app.use('/api/categories', categoryRoute_1.default);
        app.use('/api/sub-categories', subCategoryRoute_1.default);
        app.use('/api/banner', bannerRoute_1.default);
        app.use('/api/checkout', userAuthMiddleware_1.verifyToken, checkoutRoute_1.default);
        // 500 - Internal Server Error handler
        app.use((err, req, res, next) => {
            logger_1.default.error('Errors :', err);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err.message,
            });
        });
        // Start the server
        app.listen(3000, () => {
            console.log(`Server active on port: ${3000}`);
        });
    }
    catch (error) {
        console.error("Error starting the server:", error);
    }
};
startServer();
// ts-node-dev --respawn --transpile-only src
//# sourceMappingURL=index.js.map