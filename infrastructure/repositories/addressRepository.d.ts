import { IAddressDocument } from "../model/addressModel";
import { IaddressRepo } from "../../interface/addressInterface/IaddressRepo";
import { BaseRepository } from "./baseRepository";
export declare class AddressRepo extends BaseRepository<IAddressDocument> implements IaddressRepo {
    constructor();
    addAddress(userId: string, address: any): Promise<any>;
    editAddress(id: string, newAddress: any): Promise<any>;
    getAddress(userId: string): Promise<{
        status: boolean;
        message: string;
        data?: undefined;
    } | {
        status: boolean;
        data: import("mongoose").Document<unknown, {}, IAddressDocument> & IAddressDocument & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        message?: undefined;
    }>;
}
