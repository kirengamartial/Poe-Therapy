import { Router } from "express";
import { getStudio, addStudio, editStudio, deleteStudio, getSingleStudio } from "../controller/studioController.js";
import adminCheck from "../middleware/adminMiddleware.js";

const router = Router()

router.get('/all-video', getStudio)
router.get('/single-video/:id', getSingleStudio)
router.post('/post-video',adminCheck, addStudio)
router.put('/edit-video/:id',adminCheck, editStudio)
router.delete('/delete-video/:id',adminCheck, deleteStudio)


export default router