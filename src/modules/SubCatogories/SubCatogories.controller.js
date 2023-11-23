import subcategoryModel from "../../../DB/Model/SubCatogories.model.js"
import cloudinary from "../../Services/Cloudinary.js"
import slugify from 'slugify'
import CategoryModel from "../../../DB/Model/Category.model.js"

export const createSubCategory = async(req,res)=>{
    const {Name, CategoryId} = req.body;
    //return res.json(req.file)
    const subcategory = await subcategoryModel.findOne({Name});
    if(subcategory){
    return res. status(409).json({message:`sub category ${Name} already exists`})
    }
    const category = await CategoryModel.findById(CategoryId)
    if(!category){
    return res.status(404).json({message: "category not found"});
    }
    const {secure_url, public_id}= await cloudinary.uploader.upload(req.file.path, {
        folder : `${process.env.APP_NAME}/SubCategories`
    })
    const subCategory = await subcategoryModel.create({Name, slug: slugify(Name), CategoryId, image: {secure_url, public_id}})
    return res.status(201).json({message: "success", subCategory})
    }

export const getSubCategories = async(req,res)=>{
    const CategoryId= req.params.id
    //return res.json(categoryId)
    const category = await CategoryModel.findById(CategoryId);
    if (!category) {
        return res.status(404).json({message: "category not found"});
    }
    const subcategories = await subcategoryModel.find({CategoryId}).populate({ // الهدف من الpop.. الوصول لتفاصيل معلومات الاب
        path: 'CategoryId'
    })
    return res.status(200).json({message:"success", subcategories});
                
}