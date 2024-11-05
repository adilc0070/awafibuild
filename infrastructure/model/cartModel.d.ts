import mongoose, { Model } from "mongoose";
import { IUserCart } from "../../domain/entities/userCartSchema";
declare const userCartSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        product: mongoose.Types.ObjectId;
        variant: mongoose.Types.ObjectId;
        quantity: number;
    }>;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        product: mongoose.Types.ObjectId;
        variant: mongoose.Types.ObjectId;
        quantity: number;
    }>;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        product: mongoose.Types.ObjectId;
        variant: mongoose.Types.ObjectId;
        quantity: number;
    }>;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const CartModel: Model<IUserCart>;
export default userCartSchema;
