import mongoose from 'mongoose';
import Product from '../../domain/entities/productSchema';
export declare const ProductModel: mongoose.Model<Product, {}, {}, {}, mongoose.Document<unknown, {}, Product> & Product & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
