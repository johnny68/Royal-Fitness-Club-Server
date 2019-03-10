const db = require('../common/database');
const express = require('express');

var router = express.Router();

router.post('/create', (request, response) => {
    const user_id            = request.body.user_id;
    const user_weight        = request.body.user_weight;
    const user_height        = request.body.user_height;
    const user_ankle         = request.body.user_ankle;
    const user_neck          = request.body.user_neck;
    const user_shoulder      = request.body.user_shoulder;
    const user_chest_upper   = request.body.user_chest_upper;
    const user_chest_lower   = request.body.user_chest_lower;
    const user_upper_arm     = request.body.user_upper_arm;
    const user_forearm       = request.body.user_forearm;
    const user_wrist         = request.body.user_wrist;
    const user_upper_abdomen = request.body.user_upper_abdomen;
    const user_lower_abdomen = request.body.user_lower_abdomen;
    const user_waist         = request.body.user_waist;
    const user_hips          = request.body.user_hips;
    const user_thigh_upper   = request.body.user_thigh_upper;
    const user_thigh_lower   = request.body.user_thigh_lower;
    const user_calf          = request.body.user_calf; 
    var connection = db.connect();
  
    const statement = `INSERT INTO user_progress (user_id,
    user_weight, user_height, user_ankle, user_neck,
    user_shoulder, user_chest_upper, user_chest_lower,
    user_upper_arm, user_forearm, user_wrist,
    user_upper_abdomen, user_waist, user_lower_abdomen,
    user_hips, user_thigh_upper, user_thigh_lower,
    user_calf) VALUES (${user_id}, ${user_weight}, ${user_height},
      ${user_ankle}, ${user_neck}, ${user_shoulder},
      ${user_chest_upper}, ${user_chest_lower},
      ${user_upper_arm}, ${user_forearm}, ${user_wrist}, ${user_upper_abdomen},
      ${user_waist}, ${user_lower_abdomen}, ${user_hips},
      ${user_thigh_upper}, ${user_thigh_lower}, ${user_calf} )`;

    console.log(statement);
    connection.query(statement, (error, results) => {
      var result = {};
      connection.end();
      console.log(results);
      console.log(error);
      result.data = results;
      response.send(result);
    });
  });


  module.exports = router;