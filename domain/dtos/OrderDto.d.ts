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
export interface CreateOrderDTO {
    user: string;
    cart: string;
    items: ItemsListDTO[];
    paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
    transactionId?: string;
    amount: number;
    currency?: string;
    shippingAddress: {
        fullName: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        postalCode: string;
        country: string;
        phone: string;
    };
    billingAddress: {
        fullName: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        postalCode: string;
        country: string;
        phone: string;
    };
    couponCode?: string;
    discountAmount?: number;
}
export type ItemsListDTO = {
    product: mongoose.Types.ObjectId;
    quantity: number;
};
export interface OrderDTO {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    cart: mongoose.Types.ObjectId;
    items: ItemsListDTO[];
    paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
    transactionId: string;
    amount: number;
    currency: string;
    cancellationReason?: string;
    shippingAddress?: {
        fullName: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        postalCode: string;
        country: string;
        phone: string;
    };
    billingAddress?: {
        fullName: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        postalCode: string;
        country: string;
        phone: string;
    };
    paymentStatus?: 'pending' | 'completed' | 'failed';
    paymentFailureReason?: string;
    orderStatus?: 'processing' | 'shipped' | 'delivered' | 'cancelled';
    returnStatus?: 'not_requested' | 'requested' | 'approved' | 'rejected';
    refundStatus?: 'not_initiated' | 'initiated' | 'completed' | 'failed';
    couponCode?: string;
    discountAmount: number;
    paymentCompletedAt?: Date;
    deliveredAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    trackingId?: string;
    userDetails?: any;
    productDetails?: any;
}
export interface UpdateOrderStatusDTO {
    orderId: mongoose.Types.ObjectId;
    userId?: mongoose.Types.ObjectId;
    trackingId?: string;
    paymentStatus?: 'pending' | 'completed' | 'failed';
    orderStatus?: 'processing' | 'shipped' | 'delivered' | 'cancelled';
    returnStatus?: 'not_requested' | 'requested' | 'approved' | 'rejected';
    refundStatus?: 'not_initiated' | 'initiated' | 'completed' | 'failed';
}
