import mongoose from "mongoose";
interface Description {
    header: string;
    content: string;
}
export interface Variant {
    weight: string;
    inPrice: number;
    outPrice: number;
    stockQuantity: number;
}
export interface ProductDTO {
    _id: unknown;
    name: string;
    descriptions: Description[];
    category: mongoose.Types.ObjectId | null;
    subCategory: mongoose.Types.ObjectId | null;
    images: string[];
    variants: Variant[];
    isListed: boolean;
    sku: string;
    ean: string;
}
export interface ProductCreationDTO {
    name: string;
    descriptions: Description[];
    isListed: boolean;
    category: mongoose.Types.ObjectId | null;
    subCategory: mongoose.Types.ObjectId | null;
    images: string[];
    variants: Variant[];
    sku: string;
    ean: string;
}
export {};
