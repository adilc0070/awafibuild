"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCategoryImage = exports.uploadExcel = exports.uploadImages = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Create directories if they don't exist
const createUploadDir = (dir) => {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
};
// Set storage engine for images
const imageStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'src/uploads/products';
        createUploadDir(dir);
        cb(null, dir); // Set the upload destination
    },
    filename: (req, file, cb) => {
        // Create a unique filename using the current timestamp and original name
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
// Set storage engine for Excel files
const excelStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'src/uploads/bulkUpload';
        createUploadDir(dir); // Create the directory if it doesn't exist
        cb(null, dir); // Set the upload destination for Excel files
    },
    filename: (req, file, cb) => {
        // Create a unique filename using the current timestamp and original name
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
// Initialize upload variable with the storage configuration for images
exports.uploadImages = (0, multer_1.default)({
    storage: imageStorage,
    limits: { fileSize: 50000000 }, // Limit file size to 50 MB
    fileFilter: (req, file, cb) => {
        // Accept only certain file types (e.g., images)
        const filetypes = /jpeg|jpg|png|gif/; // Allowed file extensions
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            return cb(new Error("Invalid file type. Only images are allowed."));
        }
    }
});
// Initialize upload variable with the storage configuration for Excel files
exports.uploadExcel = (0, multer_1.default)({
    storage: excelStorage,
    limits: { fileSize: 50000000 }, // Limit file size to 50 MB
    fileFilter: (req, file, cb) => {
        // Accept only certain file types (e.g., Excel files)
        const filetypes = /xls|xlsx|csv/; // Allowed file extensions for Excel
        // Check for allowed MIME types for Excel files
        const allowedMimeTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
            'application/vnd.ms-excel', // .xls
            'text/csv', // .csv
            'application/csv', // .csv
            'application/octet-stream' // Generic binary stream
        ];
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = allowedMimeTypes.includes(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            return cb(new Error("Invalid file type. Only Excel files are allowed."));
        }
    },
});
// Set storage engine for category images
const categoryImageStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'src/uploads/categories'; // Directory for category images
        createUploadDir(dir); // Ensure the directory exists
        cb(null, dir); // Set the upload destination
    },
    filename: (req, file, cb) => {
        // Create a unique filename using the current timestamp and original file name
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
// Initialize multer upload for category images
exports.uploadCategoryImage = (0, multer_1.default)({
    storage: categoryImageStorage,
    limits: { fileSize: 5000000 }, // Limit file size to 5 MB for category images
    fileFilter: (req, file, cb) => {
        // Accept only image file types (jpeg, jpg, png, gif)
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            return cb(new Error('Invalid file type. Only images are allowed.'));
        }
    }
});
//# sourceMappingURL=multerConfig.js.map