import express from 'express';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {getUserData, getUserInfo, updateKubiosUser} from '../controllers/kubios-controller.mjs';

const kubiosRouter = express.Router();

kubiosRouter
  .get('/user-data', authenticateToken, getUserData)
  .get('/user-info', authenticateToken, getUserInfo)
  .put('/update', authenticateToken, updateKubiosUser)

export default kubiosRouter;
