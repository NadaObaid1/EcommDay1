import {Router} from "express"
import * as ControllerCatogores  from "../Catogories/Catogorires.controller.js"
import SubCategoryRouter from "../SubCatogories/SubCatogories.router.js"
import fileUpload, {fileValidation} from "../../Services/multer.js"
import { auth } from "../../MiddelWare/Auth.js"
import { endPoint } from "./Categories.EndPoint.js"

const router = Router()

router.use("/:id/subcategory", SubCategoryRouter) //يعني اليوز معناها كلشي سواء get post.....
router.get("/", auth(endPoint.getAlls), ControllerCatogores.getCatogorires)
router.get("/active", auth(endPoint.getActive), ControllerCatogores.getActiveCatogorires)
router.get("/:id", auth(endPoint.specific), ControllerCatogores.getSpecficCatogorires)
router.post("/", auth(endPoint.create), fileUpload(fileValidation.image).single('image'), ControllerCatogores.CreateCategory)
router.put("/:id", auth(endPoint.update), fileUpload(fileValidation.image).single('image'), ControllerCatogores.UpdateCatogorires)
export default router