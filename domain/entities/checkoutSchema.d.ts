import mongoose, { Document } from "mongoose";
export interface ICheckout extends Document {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    cart: mongoose.Types.ObjectId;
    transactionId: string;
    orderPlacedAt: Date;
    items: {
        product: mongoose.Types.ObjectId;
        quantity: number;
    }[];
    paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
    amount: number;
    currency: string;
    cancellationReason?: string;
    trackingId?: string;
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
    paymentStatus: 'pending' | 'completed' | 'failed';
    paymentFailureReason?: string;
    orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
    returnStatus: 'not_requested' | 'requested' | 'approved' | 'rejected';
    refundStatus: 'not_initiated' | 'initiated' | 'completed' | 'failed';
    couponCode?: string;
    discountAmount: number;
    paymentCompletedAt?: Date;
    deliveredAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    userDetails?: any;
    productDetails?: any;
}
