import mongoose, { Document } from "mongoose";
export interface IReview extends Document {
    user: string | mongoose.Types.ObjectId;
    product: string | mongoose.Types.ObjectId;
    order: string | mongoose.Types.ObjectId;
    rating: number;
    comment?: string;
    status: "pending" | "approved" | "declined";
}
