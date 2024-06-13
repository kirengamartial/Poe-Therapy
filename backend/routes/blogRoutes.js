import { Router } from "express";
import { getBlog, addBlog, editBlog, deleteBlog } from "../controller/blogController.js";
import adminCheck from "../middleware/adminMiddleware.js";

const router = Router()

router.get('/all-blog',getBlog)
router.post('/post-blog',adminCheck, addBlog)
router.put('/edit-blog/:id',adminCheck, editBlog)
router.delete('/delete-blog/:id',adminCheck, deleteBlog)

export default router