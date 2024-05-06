import express from 'express';
import {
  getUserById,
  getUsers,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';
import {body} from 'express-validator';
import { param } from 'express-validator';
import { validationErrorHandler } from '../middlewares/error-handler.mjs';


const userRouter = express.Router();

// /user endpoint
userRouter.route('/')
  // list users
  .get(authenticateToken, getUsers)
    // update user
  .post(
    body('username').trim().isLength({min: 3, max:30}).isAscii(),
    body('Firstname').trim().isLength({min:2, max: 20}).isAscii(),
    body('Lastname').trim().isLength({min:2, max: 20}).isAscii(),
    body('password').trim().isLength({min:8, max: 128}),
    body('email').trim().isEmail().normalizeEmail(),
    postUser);

// /user/:id endpoint
userRouter.route('/:id')
  // update user
  .put(authenticateToken,putUser)
  // get info of a user
  .get(authenticateToken,validationErrorHandler,getUserById)

  // delete user based on id
  .delete(authenticateToken,deleteUser);

// user login

export default userRouter;
