import {Router} from "express"
import * as ControllerCatogores  from "../Catogories/Catogorires.controller.js"
import fileUpload, {fileValidation} from "../../Services/multer.js"

const router = Router()

router.get("/", ControllerCatogores.getCatogorires)
router.get("/active", ControllerCatogores.getActiveCatogorires)
router.get("/:id", ControllerCatogores.getSpecficCatogorires)
router.post("/", fileUpload(fileValidation.image).single('image'), ControllerCatogores.CreateCategory)
router.put("/:id", fileUpload(fileValidation.image).single('image'), ControllerCatogores.UpdateCatogorires)
export default router