"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const mongoose_1 = require("mongoose");
const baseRepository_1 = require("./baseRepository");
const producModel_1 = require("../../infrastructure/model/producModel");
const ObjectId = mongoose_1.Types.ObjectId;
class ProductRepository extends baseRepository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async addProduct(productDTO) {
        const productEntity = {
            name: productDTO.name,
            subCategory: productDTO.subCategory,
            category: productDTO.category,
            descriptions: productDTO.descriptions,
            sku: productDTO.sku,
            ean: productDTO.sku,
            images: productDTO.images,
            variants: productDTO.variants,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return await super.create(productEntity);
    }
    async addBulkProduct(productData) {
        const productEntity = {
            sku: productData.sku,
            ean: productData.ean,
            name: productData.name,
            subCategory: productData.subCategory,
            category: productData.mainCategory,
            descriptions: productData.Descriptions,
            images: productData.images.toString().split(","),
            variants: [
                {
                    weight: productData.variantWeight,
                    inPrice: productData.variantInPrice,
                    outPrice: productData.variantOutPrice,
                    stockQuantity: productData.variantStockQuantity,
                },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return await super.create(productEntity);
    }
    async findAllProducts(page, limit) {
        const totalProducts = await this.model.countDocuments();
        const skip = (page - 1) * limit;
        const products = await this.model
            .find()
            .skip(skip)
            .limit(limit)
            .populate("category")
            .exec();
        return { products: products, totalPages: Math.ceil(totalProducts / limit) };
    }
    async findAllProductsInJsonWithAggregation() {
        try {
            const products = await this.model.aggregate([
                { $match: {} },
                {
                    $lookup: {
                        from: "MainCategory",
                        localField: "category",
                        foreignField: "_id",
                        as: "categoryDetails",
                    },
                },
                {
                    $lookup: {
                        from: "SubCategory",
                        localField: "subCategory",
                        foreignField: "_id",
                        as: "subCategoryDetails",
                    },
                },
                {
                    $unwind: {
                        path: "$categoryDetails",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $unwind: {
                        path: "$subCategoryDetails",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        sku: 1,
                        ean: 1,
                        descriptions: 1,
                        images: 1,
                        variants: 1,
                        isListed: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        category: "$categoryDetails.name",
                        subCategory: "$subCategoryDetails.name",
                    },
                },
            ]);
            const totalProducts = await this.model.countDocuments();
            return {
                products: JSON.parse(JSON.stringify(products)),
                totalPages: 0,
            };
        }
        catch (error) {
            console.error("Error in findAllProductsInJsonWithAggregation:", error);
            throw error;
        }
    }
    async findProductsBySpelling(page, limit, name) {
        const totalProducts = await this.model.countDocuments({
            isListed: true,
            isDelete: false,
            name: { $regex: name, $options: "i" }, // Case-insensitive search
        });
        const skip = (page - 1) * limit;
        // Use aggregate pipeline to prioritize prefix matches first
        const products = await this.model
            .aggregate([
            {
                $match: {
                    isListed: true,
                    isDelete: false,
                    name: { $regex: name, $options: "i" }, // Case-insensitive search
                },
            },
            {
                $addFields: {
                    prefixMatch: {
                        $regexMatch: {
                            input: "$name",
                            regex: new RegExp(`^${name}`, "i"),
                        },
                    }, // Prioritize prefix match
                },
            },
            {
                $sort: { prefixMatch: -1, name: 1 }, // Sort by prefix match (true/false) and then alphabetically by name
            },
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: "MainCategory",
                    localField: "category",
                    foreignField: "_id",
                    as: "category",
                },
            },
        ])
            .exec();
        return { products: products, totalPages: Math.ceil(totalProducts / limit) };
    }
    async findByName(name) {
        return await this.model.findOne({ name: name });
    }
    async findByIdAndVariantId(productId, variantId) {
        const products = await this.model.aggregate([
            {
                $match: {
                    _id: productId
                }
            },
            {
                $addFields: {
                    variants: {
                        $filter: {
                            input: "$variants",
                            as: "variant",
                            cond: { $eq: ["$$variant._id", variantId] }
                        }
                    }
                }
            }
        ]);
        // Return the first item in the array or an empty array if no products were found
        return products[0] || null;
    }
    async findByNameAndVariant(query) {
        const products = await super.find({
            name: query.name,
            variants: { weight: query.weight },
        });
        return products.length > 0 ? true : false;
    }
    async findByNameAndNotCurrentId(id, name) {
        const regex = new RegExp(`^${name}$`, "i");
        return await super.findOne({
            _id: { $ne: id },
            name: { $regex: regex },
        });
    }
    async isListedProduct(id) {
        return await this.model.findOne({ _id: id, isListed: true }).exec();
    }
    async updateListing(id, UpdateQuery) {
        return await this.model.updateOne({ _id: id }, UpdateQuery);
    }
    async updateImage(id, index, photo) {
        return await this.model.updateOne({ _id: id }, { $set: { [`images.${index}`]: photo } });
    }
    async updateVariantQuantity(productId, variantId, quantity) {
        return await this.model
            .findOneAndUpdate({ _id: productId, "variants._id": variantId }, // Find the product and the specific variant
        { $inc: { "variants.$.stockQuantity": quantity } }, // Increment or decrement the stock quantity
        { new: true } // Return the updated product
        )
            .exec();
    }
    // Update in productRepository.ts
    async updateProduct(id, data) {
        const product = await this.model.findById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        if ("weight" in data &&
            "inPrice" in data &&
            "outPrice" in data &&
            "stockQuantity" in data) {
            const variantData = data;
            const variant = product.variants.find((v) => v.weight === variantData.weight);
            if (variant) {
                variant.inPrice = variantData.inPrice;
                variant.outPrice = variantData.outPrice;
                variant.stockQuantity = variantData.stockQuantity;
            }
            else {
                product.variants.push(variantData);
            }
            await product.save();
            return product;
        }
        else {
            return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
        }
    }
    async deleteProduct(id) {
        const result = await this.model.findByIdAndDelete(id).exec();
        return !!result;
    }
    //------------------------------------------------------------ Both admin and user using repo---------------------------------------------
    async findListedAllProducts(page, limit, userId) {
        const skip = (page - 1) * limit;
        const filterCriteria = { isListed: true, isDelete: false };
        const totalProducts = await this.model.countDocuments(filterCriteria);
        const products = await this.model.aggregate([
            { $match: filterCriteria },
            {
                $lookup: {
                    from: "carts",
                    let: { productId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$user", userId] },
                                        {
                                            $anyElementTrue: {
                                                $map: {
                                                    input: "$items",
                                                    as: "item",
                                                    in: { $eq: ["$$item.product", "$$productId"] },
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                    as: "cartItems",
                },
            },
            {
                $lookup: {
                    from: "wishlists",
                    let: { productId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$user", userId] },
                                        {
                                            $anyElementTrue: {
                                                $map: {
                                                    input: "$items",
                                                    as: "item",
                                                    in: { $eq: ["$$item.productId", "$$productId"] },
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                    as: "wishlistItems",
                },
            },
            {
                $addFields: {
                    inCart: {
                        $cond: {
                            if: { $gt: [userId, null] }, // Check if userId is not null
                            then: { $gt: [{ $size: "$cartItems" }, 0] },
                            else: false,
                        },
                    },
                    inWishlist: {
                        $cond: {
                            if: { $gt: [userId, null] }, // Check if userId is not null
                            then: { $gt: [{ $size: "$wishlistItems" }, 0] },
                            else: false,
                        },
                    },
                },
            },
            { $project: { cartItems: 0, wishlistItems: 0 } },
            { $skip: skip },
            { $limit: limit },
        ]);
        return {
            products,
            totalPages: Math.ceil(totalProducts / limit),
        };
    }
    async fetchByCategoryAndName(page, limit, filter, userId) {
        const queryFilter = { isListed: true };
        if (filter.prodctname) {
            queryFilter.name = { $regex: filter.prodctname, $options: "i" };
        }
        if (filter.MainCategoryId) {
            queryFilter.category = filter.MainCategoryId;
        }
        if (filter.SubCategoryId) {
            queryFilter.subCategory = filter.SubCategoryId;
        }
        const skip = (page - 1) * limit;
        const totalProducts = await this.model.countDocuments(queryFilter);
        const products = await this.model.aggregate([
            { $match: queryFilter },
            {
                $lookup: {
                    from: "carts",
                    let: { productId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$user", userId] },
                                        {
                                            $anyElementTrue: {
                                                $map: {
                                                    input: "$items",
                                                    as: "item",
                                                    in: { $eq: ["$$item.product", "$$productId"] },
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                    as: "cartItems",
                },
            },
            {
                $lookup: {
                    from: "wishlists",
                    let: { productId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$user", userId] },
                                        {
                                            $anyElementTrue: {
                                                $map: {
                                                    input: "$items",
                                                    as: "item",
                                                    in: { $eq: ["$$item.productId", "$$productId"] },
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                    as: "wishlistItems",
                },
            },
            {
                $addFields: {
                    inCart: {
                        $cond: {
                            if: { $gt: [userId, null] },
                            then: { $gt: [{ $size: "$cartItems" }, 0] },
                            else: false,
                        },
                    },
                    inWishlist: {
                        $cond: {
                            if: { $gt: [userId, null] },
                            then: { $gt: [{ $size: "$wishlistItems" }, 0] },
                            else: false,
                        },
                    },
                },
            },
            { $project: { cartItems: 0, wishlistItems: 0 } },
            { $skip: skip },
            { $limit: limit },
        ]);
        return {
            products: products,
            totalPages: Math.ceil(totalProducts / limit),
        };
    }
    async productFindById(id, userId) {
        const product = await this.model.aggregate([
            { $match: { _id: id } },
            {
                $lookup: {
                    from: "carts",
                    let: { productId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$user", userId] },
                                        {
                                            $anyElementTrue: {
                                                $map: {
                                                    input: "$items",
                                                    as: "item",
                                                    in: { $eq: ["$$item.product", "$$productId"] },
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                    as: "cartItems",
                },
            },
            {
                $lookup: {
                    from: "wishlists",
                    let: { productId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$user", userId] },
                                        {
                                            $anyElementTrue: {
                                                $map: {
                                                    input: "$items",
                                                    as: "item",
                                                    in: { $eq: ["$$item.productId", "$$productId"] },
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                    as: "wishlistItems",
                },
            },
            {
                $addFields: {
                    inCart: {
                        $cond: {
                            if: { $gt: [userId, null] },
                            then: { $gt: [{ $size: "$cartItems" }, 0] },
                            else: false,
                        },
                    },
                    inWishlist: {
                        $cond: {
                            if: { $gt: [userId, null] },
                            then: { $gt: [{ $size: "$wishlistItems" }, 0] },
                            else: false,
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: 'maincategories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'MainCategoryData'
                }
            },
            {
                $lookup: {
                    from: 'subcategories',
                    localField: 'subCategory',
                    foreignField: '_id',
                    as: 'SubCategoryData'
                }
            },
            {
                $project: { category: 0, subCategory: 0, cartItems: 0, wishlistItems: 0 }
            }
        ]);
        return product[0] || null;
    }
    async listProductsBySubcategories(page, limit, subCategoryId, userId) {
        const skip = (page - 1) * limit;
        const products = await this.model.aggregate([
            {
                $match: { subCategory: subCategoryId },
            },
            {
                $lookup: {
                    from: "carts",
                    let: { productId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$user", userId] },
                                        {
                                            $anyElementTrue: {
                                                $map: {
                                                    input: "$items",
                                                    as: "item",
                                                    in: { $eq: ["$$item.product", "$$productId"] },
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                    as: "cartItems",
                },
            },
            {
                $lookup: {
                    from: "wishlists",
                    let: { productId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$user", userId] },
                                        {
                                            $anyElementTrue: {
                                                $map: {
                                                    input: "$items",
                                                    as: "item",
                                                    in: { $eq: ["$$item.product", "$$productId"] },
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                    as: "wishlistItems",
                },
            },
            {
                $addFields: {
                    inCart: {
                        $cond: {
                            if: { $gt: [userId, null] },
                            then: { $gt: [{ $size: "$cartItems" }, 0] },
                            else: false,
                        },
                    },
                    inWishlist: {
                        $cond: {
                            if: { $gt: [userId, null] },
                            then: { $gt: [{ $size: "$wishlistItems" }, 0] },
                            else: false,
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: 'maincategories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'MainCategoryData'
                }
            },
            {
                $lookup: {
                    from: 'subcategories',
                    localField: 'subCategory',
                    foreignField: '_id',
                    as: 'SubCategoryData'
                }
            },
            {
                $project: {
                    category: 0,
                    subCategory: 0,
                    cartItems: 0,
                    wishlistItems: 0
                }
            },
            { $skip: skip },
            { $limit: limit },
        ]);
        return products;
    }
    async listProductsBySubcategoriesUsingMainCategory(page, limit, mainCatId, userId) {
        try {
            const skip = (page - 1) * limit;
            const groupedProducts = await producModel_1.ProductModel.aggregate([
                {
                    $match: {
                        category: mainCatId,
                        isListed: true,
                    },
                },
                {
                    $lookup: {
                        from: "carts",
                        let: { productId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$user", userId] },
                                            {
                                                $anyElementTrue: {
                                                    $map: {
                                                        input: "$items",
                                                        as: "item",
                                                        in: { $eq: ["$$item.product", "$$productId"] },
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                            },
                        ],
                        as: "cartItems",
                    },
                },
                {
                    $lookup: {
                        from: "wishlists",
                        let: { productId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$user", userId] },
                                            {
                                                $anyElementTrue: {
                                                    $map: {
                                                        input: "$items",
                                                        as: "item",
                                                        in: { $eq: ["$$item.productId", "$$productId"] },
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                            },
                        ],
                        as: "wishlistItems",
                    },
                },
                {
                    $addFields: {
                        inCart: {
                            $cond: {
                                if: { $ne: [userId, null] },
                                then: { $gt: [{ $size: "$cartItems" }, 0] },
                                else: false,
                            },
                        },
                        inWishlist: {
                            $cond: {
                                if: { $ne: [userId, null] },
                                then: { $gt: [{ $size: "$wishlistItems" }, 0] },
                                else: false,
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: "$subCategory",
                        products: { $push: "$$ROOT" }, // Push all fields for each product in this subcategory
                    },
                },
                {
                    $lookup: {
                        from: "subcategories", // Replace with your subcategory collection name
                        localField: "_id",
                        foreignField: "_id",
                        as: "subCategoryDetails",
                    },
                },
                {
                    $unwind: {
                        path: "$subCategoryDetails", // Unwind to make subcategory details an object, not an array
                        preserveNullAndEmptyArrays: true, // Keep products with no matching subcategory
                    },
                },
                {
                    $project: {
                        subCategory: "$subCategoryDetails.name",
                        products: { $slice: ["$products", skip, limit] }, // Apply limit after skipping
                    },
                },
                { $skip: skip }, // Skip to the required page
                { $limit: limit }, // Limit results per page
            ]);
            return groupedProducts;
        }
        catch (error) {
            console.error("Error listing products by subcategories:", error);
            throw error;
        }
    }
}
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=productRepository.js.map