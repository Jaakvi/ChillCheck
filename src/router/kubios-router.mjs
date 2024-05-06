import express from 'express';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {getUserData, getUserInfo} from '../controllers/kubios-controller.mjs';

const kubiosRouter = express.Router();
// /api/kubios/user-data endpoint
  /**
   * @api {get} /user-data Requests the users information
   * @apiName KubiosInformation
   * @apiGroup Kubios
   * @apiPermission token
   *
   * @apiSuccess {Array} Results[] array of User results
   * @apiSuccess {Object} result.
   * @apiSuccess {String} user.username Username
   * @apiSuccess {String} user.user_level Userlevel of the User.
   *
   * TODO: add example response
   *
   * @apiUse InvalidTokenError
   */

kubiosRouter

  .get('/user-data', authenticateToken, getUserData)
  .get('/user-info', authenticateToken, getUserInfo)

export default kubiosRouter;
