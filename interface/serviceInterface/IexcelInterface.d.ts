/// <reference types="node" />
export interface IExcel {
    processExcel(filePath: any): Promise<any>;
    createExcelBuffer(data: any[]): Promise<Buffer>;
}
