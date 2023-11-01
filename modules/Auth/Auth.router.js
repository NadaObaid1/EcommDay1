import {Router} from 'express'
import fileUpload, {fileValidation} from "../../Services/multer.js"
import * as controllerAuth from "./Auth.controller.js"
const router = Router()

router.post("/signup", fileUpload(fileValidation.image).single('image'), controllerAuth.SignUp);
router.get("/signin", controllerAuth.SignIn);
export default router;