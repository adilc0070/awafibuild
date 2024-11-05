import { Document, Model } from "mongoose";
export interface IuserDocument extends Document {
    _id: string;
    name: string;
    email: string;
    phone: number;
    isBlocked: boolean;
    password: string;
}
export declare const userModel: Model<IuserDocument>;
