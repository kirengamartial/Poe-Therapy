import express, {Router} from 'express'
import { getAllUsers, registerUser, loginUser, editUser, logoutUser, deleteUser, loginByGoogle, resetPasswordRequest,resetPassword } from '../controller/userController.js'
import authCheck from '../middleware/authMiddleware.js'
import adminCheck from '../middleware/adminMiddleware.js'

const router  = Router()

router.get('/get-users',adminCheck, getAllUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/login-google', loginByGoogle)
router.post('/reset-request', resetPasswordRequest)
router.post('/reset-password', resetPassword)
router.put('/edit',authCheck, editUser)
router.post('/logout', logoutUser)
router.delete('/delete/:id',adminCheck,deleteUser)

export default router