"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
// Load environment variables from the .env file
dotenv.config();
// Create the config object by pulling values from environment variables
const envConfig = {
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: parseInt(process.env.EMAIL_PORT, 10), // Convert to number
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    PAYMENT_GATEWAY: process.env.PAYMENT_GATEWAY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    Atlas_Url: process.env.Atlas_Url,
    Base_Url: process.env.Base_Url,
<<<<<<< HEAD
    RAZORPAY_SECRET_KEY: process.env.RAZORPAY_SECRET_KEY,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    PORT: process.env.PORT,
    Frontend_URL: process.env.Frontend_URL,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY
=======
    RAZORPAY_SECRET_KEY: process.env.RAZORPAY_SECRET_KEY
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
    // STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY as string
};
// Log loaded environment variables for debugging
console.log("Environment Variables Loaded:", envConfig);
// Ensure that all necessary environment variables are set
if (!envConfig.EMAIL_USER || !envConfig.EMAIL_PASS) {
    throw new Error("Missing required environment variables");
}
exports.default = envConfig;
//# sourceMappingURL=env.js.map