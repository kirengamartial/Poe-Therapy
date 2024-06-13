import { Router } from "express";
import { getGallery, addGallery, editGallery, deleteGallery } from "../controller/galleryController.js";
import adminCheck from "../middleware/adminMiddleware.js";

const router = Router()

router.get('/all-image',getGallery)
router.post('/post-image',adminCheck, addGallery)
router.put('/edit-image/:id',adminCheck, editGallery)
router.delete('/delete-image/:id',adminCheck, deleteGallery)

export default router