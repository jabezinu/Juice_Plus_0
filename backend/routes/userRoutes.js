import express from 'express';
import { registerUser, loginUser, currentUser, changePassword } from '../controller/userController.js';
import { validateTokenHandler } from '../middleware/validateTokenHandler.js';

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/current', validateTokenHandler, currentUser)

router.post('/change-password', validateTokenHandler, changePassword)

export default router