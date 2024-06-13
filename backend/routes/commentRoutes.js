import {Router} from 'express'
import { createComment, getComment } from '../controller/commentController.js'
const router =  Router()

router.post('/post-comment', createComment)
router.get('/get-comment', getComment)

export default router