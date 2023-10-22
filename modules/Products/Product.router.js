import {Router} from "express"

const router = Router()

router.get("/product", (req, res)=>{
    return res.json("product...")
})

export default router