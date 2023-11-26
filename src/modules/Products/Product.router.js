import {Router} from "express"
import * as ControllerProduct from "./Product.controller.js"
import fileUpload, { fileValidation } from '../../Services/multer.js';
import { auth } from '../../MiddelWare/Auth.js';
import { endPoint } from './Product.endPoint.js';


const router = Router()

router.get("/", ControllerProduct.getProducts)
router.post('/',auth(endPoint.create), fileUpload(fileValidation.image).fields([
    {name: 'mainImage',maxCount:1},
    {name: 'subImages',maxCount: 4},
    ]), ControllerProduct.createProduct);

export default router





