import slugify from 'slugify'
import cloudinary from "../../Services/Cloudinary.js"
import subCategoryModel from "../../../DB/Model/SubCatogories.model.js"
import CategoryModel from "../../../DB/Model/Category.model.js"
import productModel from "../../../DB/Model/Product.model.js"

export const getProducts = (req, res)=>{
    return res.json({message: "product"})
}

export const createProduct = async(req, res)=>{
    const {name, price, discount, categoryId, subcategoryId} = req.body;

    const checkCategory = await CategoryModel.findById (categoryId);
    if(!checkCategory) {
    return res.status(404).json({message: "category not found"});
    }

    const checkSubCategory = await subCategoryModel.findById(subcategoryId);

    if(!checkSubCategory) {
    return res.status(404).json({message: "sub category not found"});
    }
    req.body.slug = slugify(name);
    req.body.finalPrice = price - (price * (discount || 0) / 100);

    const {secure_url, public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path, //بوصل للصورة الاساسية
    {folder: `${process.env.APP_NAME}/product/mainimages`})
    req.body.mainImage = {secure_url, public_id};
    req.body.subImages = [];

    //return res.json(req.files.subImages)
    for(const file of req.files.subImages) {
        const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,
            {folder: `${process.env.APP_NAME}/product/subimages`})
            req.body.subImages.push({secure_url,public_id});
    }
    req.body.createdBy = req.user._id;
    req.body.updatedBy = req.user._id;
    const product = await productModel.create(req.body);
    if(!product){
        return res.status(400).json({message:"error while creating product"});
    }
    return res.status(201).json({message: "success", product});
}

    