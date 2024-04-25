import 'dotenv/config';
import fetch from 'node-fetch';
import { errorHandler, notFoundHandler } from '../middlewares/error-handler.mjs';
import {customError} from '../middlewares/error-handler.mjs';

// Kubios API base URL should be set in .env
const baseUrl = process.env.KUBIOS_API_URI;

/**
* Get user data from Kubios API example
* TODO: Implement error handling
* @async
* @param {Request} req Request object including Kubios id token
* @param {Response} res
* @param {NextFunction} next
*/
const getUserData = async (req, res, next) => {
  const {kubiosIdToken} = req.user;
  const headers = new Headers();
  headers.append('User-Agent', process.env.KUBIOS_USER_AGENT);
  headers.append('Authorization', kubiosIdToken);

  const response = await fetch(
    // TODO: set the from date in request parameters
    baseUrl + '/result/self?from=2022-01-01T00%3A00%3A00%2B00%3A00',
    {
      method: 'GET',
      headers: headers,
    },
  );
  if (response.status === 200){
    const results = await response.json();
    console.log(results)
    return res.json(results)
  }
  else {
    return res.json({message:"failed to fetch data"})
  };
};

const getUserInfo = async (req, res, next) => {
  const {kubiosIdToken} = req.user;
  const headers = new Headers();
  headers.append('User-Agent', process.env.KUBIOS_USER_AGENT);
  headers.append('Authorization', kubiosIdToken);

  const response = await fetch(baseUrl + '/user/self', {
    method: 'GET',
    headers: headers,
  });
  const userInfo = await response.json();
  if (response.status===200){
      return res.json(userInfo);
  }
  else if (response.error){
    return res.status().json({error: 400, message: 'bad request'});
  }

  };


export {getUserData, getUserInfo};
