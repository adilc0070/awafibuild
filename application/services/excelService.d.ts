/// <reference types="node" />
import { IExcel } from '../../interface/serviceInterface/IexcelInterface';
export declare class ExcelService implements IExcel {
    processExcel(filePath: string): Promise<any>;
    createExcelBuffer(data: any[]): Promise<Buffer>;
    private formatDataForExcel;
}
