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
  /**
   * @api {get} /users Request user list
   * @apiName GetUsers
   * @apiGroup Users
   * @apiPermission token
   *
   * @apiSuccess {Array} user[] array of Users.
   * @apiSuccess {Object} user User object.
   * @apiSuccess {Number} user.user_id Id of the user.
   * @apiSuccess {String} user.username Username
   * @apiSuccess {String} user.user_level Userlevel of the User.
   *
   */
    // User registeration
  .post(
    body('username').trim().isLength({min: 3, max:30}).isAscii(),
    body('Firstname').trim().isLength({min:2, max: 20}).isAscii(),
    body('Lastname').trim().isLength({min:2, max: 20}).isAscii(),
    body('password').trim().isLength({min:8, max: 128}),
    body('email').trim().isEmail().normalizeEmail(),
    postUser);
    /**
   * @api {post} /users Register user
   * @apiName Post Users
   * @apiGroup Users
   * will be implemented to work with kubios
   */

// /user/:id endpoint
userRouter.route('/:id')
  // update user
   /**
   * @api {PUT} /users/:id information update
   * @apiName UpdateUsers
   * @apiGroup Users
   * @apiPermission token
   * @apiParam {number} users id
   */
  //  will be implemented to work with kubios
  .put(authenticateToken,putUser)

  // get user by id
  /**
   * @api {Get} /users/:id get user by their id
   * @apiName GetUsersByID
   * @apiGroup Users
   * @apiPermission token
   * @apiParam {number} users id
   */
   //  will be implemented to work with kubios
  .get(authenticateToken,validationErrorHandler,getUserById)

  // delete user based on id
    /**
   * @api {DELETE} /users/:id Delete user by id
   * @apiName DeleteUserByID
   * @apiGroup Users
   * @apiPermission token
   * @apiParam {number} users id
   */
   // will be implemented to work with kubios
  .delete(authenticateToken,deleteUser);




export default userRouter;
