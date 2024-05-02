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
/**
 * @api {get} /api/entries/
 * @apiName GetEntry
 * @apiGroup Entries
 * @apiPermission token
 *
 * @apiSuccess {Array} entries[] array of Diary entries.
 * @apiSuccess {Number} entry_id ID of Diary entry.
 * @apiSuccess {Date} entries.entry_date The user putten date.
 * @apiSuccess {String} entries.mood Users mood when posting the Entry.
 * @apiSuccess {Number} entries.weight Users weight.
 * @apiSuccess {Number} entries.sleep_hours The number of hours the user slept.
 * @apiSuccess {String} entries.notes A string of user written notes.
 * @apiSuccess {Time} entries.created_at time the entry was puplished.
 *
 *
 */
// "entry_id": 1,
//     "user_id": 1,
//     "entry_date": "2024-01-10T00:00:00.000Z",
//     "mood": "Happy",
//     "weight": "70.50",
//     "sleep_hours": 8,
//     "notes": "Had a great workout session",
//     "created_at": "2024-01-10T20:00:00.000Z"
// }
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
