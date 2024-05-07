import express from 'express';
import {getMe, postLogin} from '../controllers/kubios-auth-controller.mjs';
//import {getMe, postLogin} from '../controllers/auth-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import { body } from 'express-validator';
import { validationErrorHandler } from '../middlewares/error-handler.mjs';
const authRouter = express.Router();

// user login
/**
   * @api {POST} /users Request user list
   * @apiName GetUsers
   * @apiGroup Users
   * @apiPermission token
   * @apiSuccessExample
   * {
    "message": "Logged in successfully with Kubios",
    "user": {
        "email": "john.doe@test.com",
        "family_name": "Doe",
        "given_name": "John",
        "sub": "0a7cf569-8418-4d01-945b-20d8658q42bd"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJ1c2VySWQiOjcsImt1Ymlvc0lkVG9rZW4iOiJleUpyY
    VdRaU9pSlFWRVJSVUdaTGJqVTJiWEI1UlU5cGNIVnhPR1J
    GVURCUGVYbEpNV2gxV2xRd01WSlZla2RYVVN0UlBTSXNJbUZzWn
    lJNklsSlRNalUySW4wLmV5SmhkRjlvWVhOb0lqb2lOemRTY
    kxbWJsQjVjVGh2TVhwb1RuWmhaamsyWnlJc0luTjFZaU
    k2SWpCaE5HTm1OVFk1TFRJME1UZ3ROR1F6TVMwNU5EVm
    lMVGt3WkRnMk56aGtOREppWkNJc0ltVnRZV2xzWDNabGN
    tbG1hV1ZrSWpwMGNuVmxMQ0pwYzNNaU9pSm9kSFJ3Y3pw
    Y0wxd3ZZMjluYm1sMGJ5MXBaSEF1WlhVdGQyVnpkQzB4T
    G1GdFlYcHZibUYzY3k1amIyMWNMMlYxTFhkbGMzUXRNVj
    kxVVcxQlp6UTFlSGtpTENKamIyZHVhWFJ2T25WelpYSnVZ
    VzFsSWpvaU1HRTBZMlkxTmprdE1qUXhPQzAwWkRNeExUazB
    OV0l0T1RCa09EWTNPR1EwTW1Ka0lpd2laMmwyWlc1ZmJtR
    nRaU0k2SWtGMWNtOXlZU0lzSW1GMVpDSTZJamMwTlRjeGNH
    Um9kV00zZG5aaGF6UjBiRFExZFhSek9IVTRJaXdpWlhabGJ
    uUmZhV1FpT2lJd05qWXdaR0ZqWXkxaU16QXpMVFJqTmpZdE9
    HTTROaTFtTnpJMlpUTTJPV1ZpWVRRaUxDSjBiMnRsYmw5MWMy
    VWlPaUpwWkNJc0ltRjFkR2hmZEdsdFpTSTZNVGN4TXpZd01qR
    XhOaXdpWlhod0lqb3hOekV6TmpBMU56RTJMQ0pwWVhRaU9qRT
    NNVE0yTURJeE1UWXNJbVpoYldsc2VWOXVZVzFsSWpvaWMyRnNiMj
    FoWVNJc0ltVnRZV2xzSWpvaVlYVnliM0poTG5OaGJHOXRZV0V5U
    UcxbGRISnZjRzlzYVdFdVpta2lmUS5yQ0drTkFFVHNpblM2dGxPQn
    dhaGN2TnlqdTdoX2NQUUZPejN6cWpIcDJfNkFZSER3WXpSX05rRVQw
    XzFCQ0lYOGtCMzk1V0Rjd1NCbkx4Nk9GVzEzSlhVdWFWbE8zRlNs
    LTQzSVZCMWpaaVdPcjZKVGdvVklRem9VN2R5NzNrVTd5cjRKZlI2R
    0NoZFowcnh3VWd0UEc1YU5fWnRIQnQtMHMxT0hYeGM5aWRJYjZxUTdE
    dGVjX2hwc0JYOVAwTENkR292VU9HWWI1VVkzQW1ISzJ1Vl9nUGp6ZTU0
    aUJXc19sTkp2b2l5djF2MUl3RU9SVmRfaTZ6ZVBZTnFIdHZ2N0c5Vmkw
    Y1cxaWN4NlpnOXlzTGl3MEVaTmFuWFU3al9vWlpPUmRzVnBYajdtQUQ4RFVP
    a2VESi1XYTlvUUZsOTlQZ3FocjBDT01VcEw0cklZdzF4X1EiLCJpYXQiOjE3MTM
    2MDIxMDIsImV4cCI6MTcxMzYwNTcwMn0.HovA_df76ybs1rdrvgSgg1EoAwwupp
    SAsLP3AsRcxLk"
}
   * @apiSuccess {String} message of welcoming you to kubios
   * @apiSuccess {array} user array including user information email, lastname, firstname, and sub id.
   * @apiSuccess {String} Bearer token
   *
   */

authRouter.post('/login', postLogin)

// .get('/me', authenticateToken,);

export default authRouter;
