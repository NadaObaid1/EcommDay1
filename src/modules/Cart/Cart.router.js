import {Router} from 'express'
import * as cartController from './Cart.controller.js';
import { auth } from '../../MiddelWare/Auth.js';
import { endPoint } from './Cart.endPoint.js';

const router = Router();

router.post('/',auth(endPoint.create), cartController.createCart);
router.patch('/removeItem',auth(endPoint.delete), cartController.removeItem);
router.patch('/clearCart',auth(endPoint.clear), cartController.clearCart);
router.get('/getCart',auth(endPoint.get), cartController.getCart);
export default router;