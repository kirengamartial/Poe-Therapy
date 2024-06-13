import { Router } from "express"
import { getTime, addTime, editTime, deleteTime } from "../controller/timeController.js"
import adminCheck from "../middleware/adminMiddleware.js"

const router = Router()

router.get('/all-time', getTime)
router.post('/post-time',adminCheck, addTime)
router.put('/edit-time/:id',editTime)
router.delete('/delete-time/:id',adminCheck, deleteTime)

export default router