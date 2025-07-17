import express from 'express';
import { registerUser, loginUser, currentUser } from '../controller/userController.js';
import { validateTokenHandler } from '../middleware/validateTokenHandler.js';

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/current', validateTokenHandler, currentUser)

export default router