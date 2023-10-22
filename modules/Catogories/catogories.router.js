import {Router} from "express"
import * as ControllerCatogores  from "../Catogories/Catogorires.controller.js"
import * as ControllerCProduct from "../Products/Product.controller.js"

const router = Router()

router.get("/", ControllerCatogores.getCatogorires)
router.get("/", ControllerCProduct.getProducts)

export default router