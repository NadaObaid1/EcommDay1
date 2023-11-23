import slugify from 'slugify'
import CategoryModel from "../../../DB/Model/Category.model.js"
import cloudinary from "../../Services/Cloudinary.js"

export const getCatogorires = async(req, res)=>{
    //const Categories = await CategoryModel.find().select('Name')//لو درجع بس الاسم مثلا واكيد رح يرجع ال id
    const Categories = await CategoryModel.find().populate('SubCategory')
    return res.status(200).json({message: "success", Categories})
}

export const getSpecficCatogorires = async(req, res)=>{
    const {id} = req.params 
    //return res.json(id)
    const Category = await CategoryModel.findById(id)
    return res.status(200).json({message: "success", Category})
}

export const UpdateCatogorires = async(req, res)=>{
try{
    const Category = await CategoryModel.findById(req.params.id)

    if(!Category){
        return res.status(404).json({message: `invalid Category id ${req.params.id}`})  
    }
    if(req.body.Name){
        if(await CategoryModel.findOne({Name:req.body.Name}).select('Name')){ //فايند لحالها بترجع اري اذن بنسخدم فايند ون 
            return res.status(409).json({message: `Category ${req.body.Name} already exists`})  
        }
    Category.Name = req.body.Name
    Category.slug = slugify(req.body.Name) //غير النيم للنيم الجديد
 }
    if(req.body.status){
        Category.status = req.body.status
    }
    if(req.file){
        const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path, {
            folder : `${process.env.APP_NAME}/Categories`
        })
            await cloudinary.uploader.destroy(Category.image.public_id)
            Category.image = {secure_url, public_id}
    }
    Category.UpdatedBy = req.user._id
    Category.createdBy = req.user._id
    await Category.save() //انشأت اوبجكت وعملتله سيف على الداتا بيس هاي احد الطرق للحفظ بالداتا البيس
    return res.status(200).json({message: "success", Category})
}catch(error){
    return res.status(500).json({message: "error", error:error.stack})
}
}

export const getActiveCatogorires = async(req, res)=>{
    try{
      const categories = await CategoryModel.find({status: 'Active'}).select('Name image')
        return res.status(201).json({message: "success", categories})
    }catch(err){
        return res.status(500).json({message: "error", err: err.stack})
    }
}


export const CreateCategory = async (req, res)=>{
    try{
        const Name = req.body.Name.toLowerCase()
        const SlugName = slugify(Name) //بحطيلي داش اذا كتبت الاسم وكان في مسافة فيه
    
        if(await CategoryModel.findOne({Name})){
            return res.status(409).json("Category Name is Exists")
        }
    
        const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path, {
            folder : `${process.env.APP_NAME}/Categories`
        })
    
        const Cat = await CategoryModel.create({Name, slug: SlugName, image: {secure_url, public_id}, createdBy: req.user._id,
            UpdatedBy: req.user._id})
        return res.status(201).json({message: "success", Cat})
        //return res.json(SlugName)
    }catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ message: "An error occurred while creating the category", error });
  }
}