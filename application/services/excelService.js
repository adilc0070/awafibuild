"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelService = void 0;
const xlsx_1 = __importDefault(require("xlsx"));
class ExcelService {
    async processExcel(filePath) {
        // Read the Excel file
        const workbook = xlsx_1.default.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheetName]);
        return sheetData;
    }
    async createExcelBuffer(data) {
        // Transform the data to handle nested structures
        const formattedData = this.formatDataForExcel(data);
        // Create a new workbook and worksheet
        const workbook = xlsx_1.default.utils.book_new();
        const worksheet = xlsx_1.default.utils.json_to_sheet(formattedData);
        // Add the worksheet to the workbook
        xlsx_1.default.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        // Write the workbook to a buffer
        const buffer = xlsx_1.default.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        return buffer;
    }
    formatDataForExcel(data) {
        const formattedData = [];
        data.forEach(product => {
            const { _id, sku, ean, name, isListed, images, createdAt, updatedAt } = product;
            // Handle variants and descriptions by creating individual rows for each combination
            (product.variants || []).forEach((variant) => {
                formattedData.push({
                    _id,
                    sku,
                    ean,
                    name,
                    isListed,
                    images: images.join(', '), // Convert array to a comma-separated string for easier Excel display
                    createdAt,
                    updatedAt,
                    variantWeight: variant.weight,
                    variantInPrice: variant.inPrice,
                    variantOutPrice: variant.outPrice,
                    variantStockQuantity: variant.stockQuantity,
                });
            });
        });
        return formattedData;
    }
}
exports.ExcelService = ExcelService;
//# sourceMappingURL=excelService.js.map