import { Document, Model } from "mongoose";
export interface IAddressDocument extends Document {
    userId: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode: string;
    country: string;
}
export declare const addressModel: Model<IAddressDocument>;
