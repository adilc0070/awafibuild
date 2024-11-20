import mongoose, { Document } from "mongoose";
export interface IReview extends Document {
    user: string | mongoose.Types.ObjectId;
    product: string | mongoose.Types.ObjectId;
    order: string | mongoose.Types.ObjectId;
    rating: number;
    comment?: string;
}
declare const reviewSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    comment: string;
    user: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
    order: mongoose.Types.ObjectId;
    rating: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    comment: string;
    user: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
    order: mongoose.Types.ObjectId;
    rating: number;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    comment: string;
    user: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
    order: mongoose.Types.ObjectId;
    rating: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default reviewSchema;
