import mongoose, { Document } from "mongoose";
export interface IBannerItem {
    imageUrl: string;
    listed: boolean;
    startDate?: Date;
    endDate?: Date;
    name: string;
}
export interface IBanner extends Document {
    _id: mongoose.Types.ObjectId;
    offerBanners: IBannerItem[];
    welcomeBanners: IBannerItem[];
    collectionBanners: IBannerItem[];
    createdAt: Date;
    updatedAt: Date;
}
