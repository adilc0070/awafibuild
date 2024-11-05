import mongoose from "mongoose";
export interface ProductItemDTO {
    product: string;
    variant: string;
    quantity: number;
}
export interface CheckoutDTO {
    userId: string;
    stripe_id: string;
    amount: number;
    currency: string;
    paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
    time: Date;
    products: ProductItemDTO[];
}
export interface CheckoutCreateDTO {
    user: mongoose.Types.ObjectId;
    amount: number;
    paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
    orderPlacedAt: Date;
    deliveredAt: Date;
    cart: mongoose.Types.ObjectId;
    items: {
        product: mongoose.Types.ObjectId;
        variant: mongoose.Types.ObjectId;
        quantity: number;
    }[];
    currency: string;
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
