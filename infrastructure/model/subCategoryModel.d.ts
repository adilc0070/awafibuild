import mongoose from 'mongoose';
import IsubCategory from '../../domain/entities/subCategorySchema';
declare const SubCategory: mongoose.Model<IsubCategory, {}, {}, {}, mongoose.Document<unknown, {}, IsubCategory> & IsubCategory & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default SubCategory;
