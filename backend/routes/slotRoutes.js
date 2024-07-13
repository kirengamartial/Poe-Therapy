import {Router} from 'express'
import { getSlot, addSlot,getUserSlots, deleteSlot } from '../controller/slotController.js'
import authCheck from '../middleware/authMiddleware.js'
import adminCheck from '../middleware/adminMiddleware.js'

const router = Router()

router.get('/all-slot',adminCheck, getSlot)         
router.get('/user-slot',authCheck, getUserSlots)
router.post('/post-slot',authCheck, addSlot)
router.delete('/delete-slot/:id',adminCheck, deleteSlot)

export default router