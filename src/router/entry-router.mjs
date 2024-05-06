import express from 'express';
import {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs'
import { body } from 'express-validator';

const entryRouter = express.Router();


entryRouter.route('/')
  .get(authenticateToken, getEntries)

  .post(authenticateToken,
      body('user_id').trim().isInt(),
      body('entry_date').trim().isDate(),
      body('mood').trim().isLength({min:3, max:20}).isAlpha(),
      body('weight').trim().isFloat(),
      body('sleep_hours').trim().isInt(),
      body('notes').trim().isAscii()
      ,postEntry);
    // body('username').trim().isLength({min: 3, max:20}).isAlphanumeric(),
    // body('password').trim().isLength({min:8, max: 128}),
    // body('email').trim().isEmail()

entryRouter.route('/:id')

  .get(authenticateToken,getEntryById)
  .put(putEntry)
  .delete(authenticateToken,deleteEntry);

export default entryRouter;
