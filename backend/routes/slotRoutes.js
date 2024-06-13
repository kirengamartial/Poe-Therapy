import {Router} from 'express'
import { getSlot, addSlot,getSingleSlot, deleteSlot } from '../controller/slotController.js'
import authCheck from '../middleware/authMiddleware.js'
import adminCheck from '../middleware/adminMiddleware.js'

const router = Router()

router.get('/all-slot',adminCheck, getSlot)
router.post('/single-slot', getSingleSlot)
router.post('/post-slot',authCheck, addSlot)
router.delete('/delete-slot/:id',adminCheck, deleteSlot)

export default router