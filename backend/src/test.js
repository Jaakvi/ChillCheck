//serverin käynnistys tapahtuu "npm run dev"

import  express  from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import itemRouter from './router/item-router.mjs';
import { getUserById, getUsers, postUser, putUser } from './controllers/user-controller.mjs';
import { getItemById, getItems, postItem, putItem, deleteItem } from './controllers/item-controller.mjs';
import userRouter from './router/user.router.mjs';
import entryRouter from './router/entry-router.mjs';
import cors from 'cors';
import logger from './middlewares/logger.mjs';
import authRouter from './router/auth-router.mjs';
import { errorHandler, notFoundHandler } from './middlewares/error-handler.mjs';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();
app.use(express.json())
app.use(express.static('public'))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/docs', express.static(path.join(__dirname, '../docs')));

app.use(cors())
app.use(logger);
//yksittäiset itemsit id:n avulla
app.use('/api/items',itemRouter)
app.use('/api/users', userRouter)
app.use('/api/entries', entryRouter)
app.use('/api/auth', authRouter)
//default 404 note
app.use(notFoundHandler)
// Error handler for sending responses to all error cases
app.use(errorHandler)


//kaikki itemsit
// app.get('/items', getItems);
// // POST
// app.post('/items',postItem);
// // PUT
// app.put('/items/:id',putItem);
// // Delete
// app.delete('/items/:id', deleteItem)


//user resources
//list of users
// app.get('/users',getUsers);
// //get info of a user
// app.get('/users/:id', getUserById);
// //user registerestion
// app.post('/users', postUser)
// app.post('/users/login', postLogin);
// // user information update
// app.put('/users/:id',putUser);





//POST http://127.0.0.1:3000/items/
//TODO(vapaaehtoinen: lisää objekti listaan, tästä ensiviikolla enemmän)

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
