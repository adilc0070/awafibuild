import mongoose from 'mongoose';
import Category from '../../domain/entities/categorySchema';
declare const Category: mongoose.Model<Category, {}, {}, {}, mongoose.Document<unknown, {}, Category> & Category & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Category;
