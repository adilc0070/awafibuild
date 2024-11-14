/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
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
