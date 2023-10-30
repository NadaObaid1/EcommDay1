import mongoose from "mongoose";

const connectDb = async()=>{
    return await mongoose.connect(process.env.DB)
    .then(()=>{
        console.log("connect Succssfully")
    }).catch((err)=>{
        console.log(`error connect to Database ${err}`)
    })
}

export default connectDb