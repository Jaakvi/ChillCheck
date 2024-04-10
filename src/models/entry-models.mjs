import promisePool from '../database.mjs';

const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};


const listAllEntriesByUserId = async (id) => {
  try {
    const sql = 'SELECT * FROM DiaryEntries where user_id=?';
    const params = [id]
    const [rows] = await promisePool.query(sql,params)
    return [rows]
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findEntryById = async (id) => {
  try {
    const sql = 'SELECT * FROM DiaryEntries WHERE entry_id = ?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    if (rows.length === 0) {
      return {error: 404, message: 'not found'};
    }
    // Remove password property from result
    return rows[0];
  } catch (error) {
    console.error('findEntryById', error);
    return {error: 500, message: 'db error'};
  }
};

const addEntry = async (entry) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = entry;
  const sql = `INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes)
  VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, entry_date, mood, weight, sleep_hours, notes];
  try {
    // change query method?
    const rows = await promisePool.query(sql, params);
    // console.log('rows', rows);
    return {entry_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const UpdateEntryById = async (DiaryEntries) => {
  try {
    const sql = 'UPDATE DiaryEntries SET entry_date=?, mood=?, weight=?, sleep_hours=?, notes=? WHERE entry_id=?';
    const params = [DiaryEntries.entry_date, DiaryEntries.mood,DiaryEntries.weight, DiaryEntries.sleep_hours,DiaryEntries.notes, DiaryEntries.entry_id];
    const [result] = await promisePool.query(sql, params);
    console.log(result);
    return {message: 'Entry updated', entry_id: DiaryEntries.entry_id};
  } catch (error) {
    // fix error handling
    // now duplicate entry error is generic 500 error, should be fixed to 400 ?
    console.error('UpdateEntryById', error);
    return {error: 500, message: 'db error'};
  }
};


const DeleteEntryById = async (id) => {
  try {
    const sql = 'DELETE FROM DiaryEntries WHERE entry_id=?';
    const params = [id];
    const [result] = await promisePool.query(sql, params);
    console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'user not found'};
    }
    return {message: 'user deleted', entry_id: id};
  } catch (error) {
    // note that users with other data (FK constraint) cant be deleted directly
    console.error('deleteUserById', error);
    return {error: 500, message: 'db error'};
  }
};

export {listAllEntries, findEntryById, addEntry, UpdateEntryById, DeleteEntryById, listAllEntriesByUserId};
