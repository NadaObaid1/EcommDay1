import productRouter from "./modules/Products/Product.router.js"
import  CatogoriresRouter from "./modules/Catogories/catogories.router.js"

const initApp =(app, express)=>{
    app.use(express.json())
    app.get("/", (req, res) =>{
        return res.status(200).json({message:"welcome"})
    })

    app.use("/product", productRouter)
    app.use("/Catogories", CatogoriresRouter)

    app.get("*", (req, res) =>{
        return res.status(500).json({message:"page not found"})
    })
    

}
export default initApp 