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
export interface ProductItemDTO {
    product: string;
    variant: string;
    quantity: number;
}
export interface ShippingAddressDTO {
    fullName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
}
export interface CheckoutDTO {
    userId: string;
    amount: number;
    currency: string;
    paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
    time: Date;
<<<<<<< HEAD
=======
    products: ProductItemDTO[];
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
    shippingAddress: ShippingAddressDTO;
    transactionId: string;
    paymentStatus: 'pending' | 'completed' | 'failed';
}
export interface CheckoutCreateDTO {
    user: mongoose.Types.ObjectId;
    amount: number;
    currency: string;
    paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
    orderPlacedAt: Date;
    deliveredAt: Date;
    cart: mongoose.Types.ObjectId;
    items: {
        productId: string;
        variantId: string;
        name: string;
        quantity: number;
        weight: string;
        inPrice: number;
        outPrice: number;
        images: string;
        stockQuantity: number;
        rating: number;
    }[];
    shippingAddress: ShippingAddressDTO;
    transactionId: string;
<<<<<<< HEAD
    paymentStatus: "pending" | "completed" | "failed";
=======
    paymentStatus: 'pending' | 'completed' | 'failed';
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
}
export interface OrderSummary {
    totalCount: number;
    totalAmount: number;
    orderStatus: 'delivered' | 'shipped' | 'returned' | 'processing';
}
export interface RevenueSummary {
    totalRevenue: number;
    count: number;
    day: number;
}
