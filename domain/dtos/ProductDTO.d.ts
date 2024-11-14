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
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
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
    inCart?: boolean;
    inWishlist?: boolean;
    MainCategoryData?: any;
    SubCategoryData?: any;
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
