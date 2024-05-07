import express from 'express';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {getUserData, getUserInfo} from '../controllers/kubios-controller.mjs';

const kubiosRouter = express.Router();
// /api/kubios/user-data endpoint
  /**
   * @api {get} /user-data Requests the users information
   * @apiname getUserdata
   * @apiGroup Kubios
   * @apiPermission token
   * @apiSuccessExample {json} Success-Response
   * {
    results": [
        {
            "create_timestamp": "2024-02-09T08:40:57.445402+00:00",
            "daily_result": null,
            "measure_id": "f4e3319d-df85-40e5-80fc-15b31f10e31a",
            "measured_timestamp": "2024-02-09T10:37:37+02:00",
            "result": {
                "artefact": 46.263032720633134,
                "artefact_level": "VERY LOW",
                "freq_domain": {
                    "HF_peak": 0.15,
                    "HF_power": 129.49981720735522,
                    "HF_power_nu": 38.31892464924658,
                    "HF_power_prc": 33.55465770284691,
                    "LF_HF_power": 1.6079062511664375,
                    "LF_peak": 0.04666666666666667,
                    "LF_power": 208.22356561261745,
                    "LF_power_nu": 61.613238481499266,
                    "LF_power_prc": 53.9527438761576,
                    "VLF_peak": 0.04,
                    "VLF_power": 47.98429485325251,
                    "VLF_power_prc": 12.43319584254917,
                    "tot_power": 385.9369341632949
                },
                "mean_hr_bpm": 61.59545371800872,
                "mean_rr_ms": 974.0978656426025,
                "pns_index": -0.18524754700382892,
                "readiness": 62.5,
                "recovery": 62.5,
                "respiratory_rate": 7.16,
                "rmssd_ms": 25.42644515775738,
                "sd1_ms": 18.046375575058658,
                "sd2_ms": 32.79494825201846,
                "sdnn_ms": 26.425617711159493,
                "sns_index": 0.5293473600094027,
                "stress_index": 14.660666125666104
            },
            "result_id": "213136ba-050a-4b9f-8b4d-24ac2d4cfd19",
            "result_type": "readiness"
        },
  * @apiSuccess [array] results that include resutls of the measurment
  * @apiErrorExample {json} Error-response unauthorized token invalid or old 403:
    *{
    "message": "invalid token"
      }

  */
  /**
  * @api {get} /user-info Requests the users account information
  * @apiname getUserprofile
  * @apiGroup Kubios
  * @apiPermission token
  * @apiSuccessExample {json} Success-Response
   * {
    {
    "status": "ok",
    "user": {
        "email": "john.doe@email.com",
        "family_name": "Doe",
        "given_name": "John",
        "sub": "0ac6f509-3411-4d41-94b7-90d863ikf42bd"
    }
}
  *
  *
  * @apiErrorExample {json} Error-Response invalid token 403:
  * {
    "message": "invalid token"
    }


  */


kubiosRouter

  .get('/user-data', authenticateToken, getUserData)
  .get('/user-info', authenticateToken, getUserInfo)

export default kubiosRouter;
