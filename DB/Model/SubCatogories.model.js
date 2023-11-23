import mongoose, {Schema, Types, model} from "mongoose";

const SubCategorySchema = new Schema({
    Name:{
        type: String,
        required: true,
        unique : true
    },
     image: { 
        type: Object,
        required : true
     },
     slug : {
        type: String,
        required : true
     },
      status : {
        type : String,
        default : 'Active',
        enum : ['Active', 'Inactive']
      },
       CategoryId:{type: Types.ObjectId, ref: 'Category', required: true},
       createdBy:{type: Types.ObjectId, ref: 'User'},
       UpdatedBy:{type: Types.ObjectId, ref: 'User'}
    },
    { 
        timestamps : true
    })
const SubCategoryModel = mongoose.models.Category || model('SubCategory', SubCategorySchema)
export default SubCategoryModel