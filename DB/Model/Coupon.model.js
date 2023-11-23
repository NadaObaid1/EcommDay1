import mongoose, {Schema, Types, model} from "mongoose";

const CouponSchema = new Schema({
    Name:{
        type: String,
        required: true,
        unique : true
    },
    amount:{
        type: Number,
        required : true,
     },
    usedBy:
        [{type: Types.ObjectId, ref: 'User'}], // كوبون الخصم بدي اليوزر يستخدمه مرة وحدة بس
        expiredDate: Date,

    createdBy:{type: Types.ObjectId, ref: 'User'},
    UpdatedBy:{type: Types.ObjectId, ref: 'User'},
    
    isDeleted: {
        type: Boolean,
        default: false
    }
    },
    { 
        timestamps : true
    })
const CouponModel = mongoose.models.Coupon || model('Coupon', CouponSchema)
export default CouponModel