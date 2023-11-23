import { Router } from 'express'
import * as CouponController from './Coupon.controller.js'

const router = Router()

router.post('/', CouponController.CreateCoupon)
router.get('/', CouponController.getCoupon)
router.put('/:id', CouponController.updateCoupon)
router.patch('/softDelete/:id', CouponController.softDelete) //patch لانه تعديل ع حقل واحد بس
router.delete('/hardDelete/:id', CouponController.hardDelete)
router.patch('/restore/:id', CouponController.restore)
export default router;

