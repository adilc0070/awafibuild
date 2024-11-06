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
    products: ProductItemDTO[];
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
        product: mongoose.Types.ObjectId;
        variant: mongoose.Types.ObjectId;
        quantity: number;
    }[];
    shippingAddress: ShippingAddressDTO;
    transactionId: string;
    paymentStatus: 'pending' | 'completed' | 'failed';
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
