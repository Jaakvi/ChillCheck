import { validationResult } from "express-validator";
import {listAllEntries, findEntryById, addEntry,UpdateEntryById, DeleteEntryById, listAllEntriesByUserId } from "../models/entry-models.mjs";
import bcrypt from 'bcryptjs';
const getEntries = async (req, res) => {
  try{
    // return only logged in user's own entries
    const token_user_id = req.user.user_id;
    const user_password = req.user.password
    const result = await listAllEntriesByUserId(token_user_id);
    if (!token_user_id){
        return res.status(401).json({message:"Unauthorized user"})
    }
    if (token_user_id){
        res.json(result)
    }

  } catch(error){
    res.status(500).json({message:"Jotain meni vikaan serverin puolella"})

  }
  };

const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const postEntry = async (req, res, next) => {
  const token_user_id = req.user.user_id;
  if(!token_user_id){
    res.status(401).json({message:'Unauthorized'})
  }else{
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = req.body;
  const validationError = validationResult(req);
  if (validationError.isEmpty()) {
      const result = await addEntry({
        user_id,
        entry_date,
        mood,
        weight,
        sleep_hours,
        notes

      }, next);
      return res.status(201).json(result);
  } else {
    const error = new Error('bad request');
    error.status = 400;
    error.errors = validationError.errors
    return next(error)
    }

  }
};

const putEntry = async(req, res) => {
    const entry_id = req.params.id;
    const {entry_date, mood, weight, sleep_hours, notes} = req.body;
    // check that all needed fields are included in request
    if (entry_id && entry_date && mood && weight && sleep_hours && notes) {
        const result = await UpdateEntryById({entry_id, ...req.body});
      if (result.error) {
        return res.status(result.error).json(result);
      }
      return res.status(201).json(result);
    } else {
      return res.status(400).json({error: 400, message: 'bad request'});
    }
  };


const deleteEntry = async(req, res) => {
  const result = await DeleteEntryById(req.params.id);
  const token_user_id = req.user.user_id
  if (result.error) {
    return res.status(result.error).json({message: "there was a proplem at deleted from the table"});
  }
  if (token_user_id){
    return res.json({message: "Entry has been deleted"});
  } else {
    return res.status(401).json({message:"Unauthorized"})
  }

};


export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
