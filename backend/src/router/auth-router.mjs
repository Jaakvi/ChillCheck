import express from 'express';
import {getMe, postLogin} from '../controllers/auth-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import { body } from 'express-validator';
import { validationErrorHandler } from '../middlewares/error-handler.mjs';
const authRouter = express.Router();

// user login
authRouter.post('/login', postLogin)
  .get('/me', authenticateToken, getMe);

export default authRouter;
