"use strict";
// logger.ts or logger.js
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, label, printf, colorize } = winston_1.format;
// Define a custom log format
const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
// Create the logger
const logger = (0, winston_1.createLogger)({
    format: combine(label({ label: 'AwafiMill' }), // You can change the label to your app name
    timestamp(), colorize(), customFormat),
    transports: [
        new winston_1.transports.Console({
            level: 'info', // Log 'info' level and below to the console
        }),
        new winston_1.transports.File({
            filename: 'src/logs/error.log',
            level: 'error', // Only log 'error' level and below to this file
        }),
        new winston_1.transports.File({
            filename: 'src/logs/combined.log', // Log all levels to the combined log file
        })
    ],
});
// Export the logger instance to use in other files
exports.default = logger;
//# sourceMappingURL=logger.js.map