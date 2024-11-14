import mongoose, { Document } from "mongoose";
export default interface ICategory extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    photo: string;
    isListed: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
