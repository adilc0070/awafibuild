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
    paymentMethod: 'COD' | 'Tabby' | 'Stripe';
    shippingAddress: ShippingAddressDTO;
    currency: string;
    transactionId: string;
    amount: number;
    paymentStatus: "pending" | "completed" | "failed";
}
export interface CheckoutCreateDTO {
    user: mongoose.Types.ObjectId;
    cartId?: mongoose.Types.ObjectId;
    amount: number;
    currency: string;
    paymentMethod: 'COD' | 'Tabby' | 'Stripe';
    orderPlacedAt: Date;
    items: {
        productId: string;
        variantId: string;
        name: string;
        weight: string;
        quantity: number;
        price: number;
        images: string;
    }[];
    shippingAddress: ShippingAddressDTO;
    paymentStatus: "pending" | "completed" | "failed";
    transactionId: string;
    deliveredAt: Date;
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
