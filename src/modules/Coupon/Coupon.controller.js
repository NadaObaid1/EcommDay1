import couponModel from "../../../DB/Model/Coupon.model.js"

export const CreateCoupon = async(req, res) => {
    const {Name, amount} = req.body;

    if(await couponModel.findOne({Name}) ){
       return res.status(409).json({message: "coupon name already exists"});
    }
    const coupon = await couponModel.create(req.body);
       return res.status(201) .json({message:"success", coupon});
} 

export const getCoupon = async(req, res) => {
    const Coupons = await couponModel.find({isDeleted:false})
    res.status(200).json({message:"success", Coupons})
}

export const updateCoupon = async(req, res)=>{
    const coupon = await couponModel.findById(req.params.id);
    //return res.json(coupon)
    if(!coupon) {
    return res.status(404).json({message: 'coupon not found'});
    }
    if(req.body.Name) {
    if(await couponModel.findOne({Name:req.body.Name}).select('Name')){ // روح ع الداتابيس شوفهااذا موجود رجعلي بس اسمه
    return res.status(409).json({message: `coupon ${req.body.Name} already exists`})
    }
    coupon.Name = req.body.Name;
    }
    if(req.body.amount) {// حطيتها ب If  لانه يمكن مش باعتها فبفحص بالاول
    coupon.amount = req.body.amount; //يعني عدلي ع هاد الاوبجكت
    }
    await coupon.save();
    return res. status(200).json({message: "success", coupon});
}

//انا بدي احذف المنتج بس معلوماته ما بدي تروح ايش الحل؟
//soft and delete =>>>> اذا كانت فولس يعني مش محذوف والعكس بصير تغيير بس عليهاوالحلو بهاي الطريقة بعملي ريستور اول ما اضغط عليها برجعلي المنتج 

export const softDelete = async(req, res)=>{ // ما بحذف حذف حقيقي 
    try{
        const {id} = req.params;
        const coupon = await couponModel.findOneAndUpdate({_id:id, isDeleted:false}, {isDeleted: true}, 
        {new: true}); //رجعي المعلومات الجديدة
        if(!coupon){ //اذا الكوبون مش موجود
          return res.status(400).json({message: "can't delete this coupon"});
        }
          return res.status(200).json({message: "success"});
    }catch(err){
          return res.status(200).json({err: "error where soft Delete"});
    }
}

export const hardDelete = async(req, res)=>{ // بحذفه حذف نهائي
    const {id} = req.params;
    const coupon = await couponModel.findOneAndDelete({_id:id})
    if(!coupon){ //اذا الكوبون مش موجود
        return res.status(400).json({message: "can't delete this coupon"});
    }
    return res.status(200).json({message: "success"});
}

export const restore = async(req, res)=>{ // ما بحذف حذف حقيقي 
        const {id} = req.params;
        const coupon = await couponModel.findOneAndUpdate({_id:id, isDeleted: true}, {isDeleted: false}, 
        {new: true}); //رجعي المعلومات الجديدة
        if(!coupon){ //اذا الكوبون مش موجود
          return res.status(400).json({message: "can't restore this coupon"});
        }
        return res.status(200).json({message: "success"});
}
