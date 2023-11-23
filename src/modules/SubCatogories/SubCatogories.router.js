import {Router} from 'express';
import * as subCategoriesController from './SubCatogories.controller.js';
import fileUpload, { fileValidation } from '../../Services/multer.js';

const router = Router({mergeParams: true}); // ويبعتله ال parmams  ,هيك بسمح للاب يوصل للابن ويشوفه 

router.post('/', fileUpload(fileValidation.image).single('image'),
subCategoriesController.createSubCategory)

router.get('/', subCategoriesController.getSubCategories)

export default router;