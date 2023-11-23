import productRouter from "./Products/Product.router.js"
import CatogoriresRouter from  "./Catogories/catogories.router.js"
import AuthRouter from "./Auth/Auth.router.js"
import SubCatogoriresRouter from "./SubCatogories/SubCatogories.router.js"
import CouponRouter from './Coupon/Coupon.router.js'
import connectDb from "../../DB/Connection.js"
import { sendEmail } from "../Services/Email.js"

const initApp = async(app, express)=>{
    app.use(express.json())
    connectDb()
    app.get("/", (req, res) =>{
        return res.status(200).json({message:"welcome"})
    })

    app.use("/product", productRouter)
    app.use("/Catogories", CatogoriresRouter)
    app.use("/SubCatogories", SubCatogoriresRouter)
    app.use("/auth", AuthRouter)
    app.use('/coupon', CouponRouter)

    app.get("*", (req, res) =>{
        return res.status(500).json({message:"page not found"})
    })
    

}
export default initApp 