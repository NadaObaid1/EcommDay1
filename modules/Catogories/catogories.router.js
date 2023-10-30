import {Router} from "express"
import * as ControllerCatogores  from "../Catogories/Catogorires.controller.js"
import fileUpload, {fileValidation} from "../../Services/multer.js"

const router = Router()

router.get("/", ControllerCatogores.getCatogorires)
router.post("/", fileUpload(fileValidation.image).single('image'), ControllerCatogores.CreateCategory)
export default router