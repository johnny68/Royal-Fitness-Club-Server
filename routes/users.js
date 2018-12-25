const express = require('express');
const db = require('../common/database');
const crypto = require('crypto');
const utils = require('../common/utils');
const moment = require('moment');
const randomString = require('randomstring');

var router = express.Router();

/* Create ADMIN */

router.post('/admin/create', (request, response) =>{
  const userName = request.body.userName;
  const password = crypto.createHash('SHA256').update(request.body.password).digest('base64');
  const name     = request.body.name;
  const emailID  = request.body.emailID;

  console.log(password);
  var connection = db.connect();

  const statement = `INSERT INTO admin (admin_username, admin_password, admin_name, admin_email_id, admin_is_active) VALUES ('${userName}', '${password}','${name}','${emailID}', 'Y')`;

  console.log(statement);
  connection.query(statement, (error, results) => {
    connection.end();
    console.log(results);
    console.log(error);

    response.send(utils.createResult(error, results));
  });
})

/* POST ADMIN Login */
router.post('/admin/login', (request, response) => {

  const userName = request.body.userName;
  const password = crypto.createHash('SHA256').update(request.body.password).digest('base64');

  var connection = db.connect();
  const statement = `SELECT admin_id, admin_username FROM admin WHERE admin_username = '${userName}' and admin_password = '${password}'`;
  console.log(statement);

  connection.query(statement, (error, results) =>{
    connection.end();
    var result = {};
    console.log(results);
    console.log(error);
    if(results.length === 0){
      result['status']  = 'error';
      result["message"] = 'Invalid Username or password';
    }
    else{
      result["status"]  = 'success';
      result['message'] = 'Correct Login Details';
      result['data']    = results;
    }
    response.send(result);
  });

});


/* Create Normal User */

router.post('/user/create', (request, response) =>{
  const user_email           = request.body.user_email;
  const user_name            = request.body.user_name;
  const user_aaddhar         = request.body.user_aaddhar;
  const user_address         = request.body.user_address;
  const user_city            = request.body.user_city;
  const user_state           = request.body.user_state;
  const user_pincode         = request.body.user_pincode;
  const user_mobile_number   = request.body.user_mobile_number;
  const user_date_of_birth   = moment( request.body.user_date_of_birth, "DD-MM-YYYY").format("YYYY-MM-DD");
  const user_gender          = request.body.user_gender;
  const user_blood_group     = request.body.user_blood_group;
  const user_height          = request.body.user_height;
  const user_weight          = request.body.user_weight;
  const user_purpose         = request.body.user_purpose;
  const user_training_type   = request.body.user_training_type;
  const user_medical_history = request.body.user_medical_history;
  const user_past_gym        = request.body.user_past_gym;
  const user_past_protien    = request.body.user_past_protien;

  console.log(user_date_of_birth);


  var connection = db.connect();

  const statement = `INSERT INTO user_records
  (user_email, user_name, user_aaddhar, user_address, user_city, user_state, user_pincode, user_mobile_number, user_date_of_birth, user_gender,
    user_blood_group, user_height, user_weight, user_purpose, user_training_type, user_medical_history, user_past_gym, user_past_protien)
  VALUES
  ('${user_email}','${user_name}','${user_aaddhar}','${user_address}','${user_city}','${user_state}','${user_pincode}','${user_mobile_number}','${user_date_of_birth}','${user_gender}'
  ,'${user_blood_group}','${user_height}','${user_weight}','${user_purpose}','${user_training_type}','${user_medical_history}','${user_past_gym}','${user_past_protien}')`;

  console.log(statement);
  connection.query(statement, (error, results) => {
    
    
    console.log(results);
    console.log(error);
    const password_generated = randomString.generate({ length : 6, charset : 'alphanumeric'});
    console.log(password_generated);
    const password = crypto.createHash('SHA256').update(password_generated).digest('base64');
    console.log(password);
      const statement_user_create = `INSERT INTO users (user_email, user_password, user_active) VALUES ('${user_email}', '${password}', 'Y')`;
      console.log(statement_user_create);
      connection.query(statement_user_create, (error_create, results_create) =>{
        console.log(results_create);
        console.log(error_create);
      })
      connection.end();
    response.send(utils.createResult(error, results));
  });

  
})

/* POST user Login */
router.post('/user/login', (request, response) => {

  const userName = request.body.userName;
  const password = crypto.createHash('SHA256').update(request.body.password).digest('base64');

  var connection = db.connect();
  const statement = `SELECT user_email, user_password FROM users WHERE user_email = '${userName}' and user_password = '${password}'`;
  console.log(statement);

  connection.query(statement, (error, results) =>{
    connection.end();
    var result = {};
    console.log(results);
    console.log(error);
    if(results.length === 0){
      result['status']  = 'error';
      result["message"] = 'Invalid Username or password';
    }
    else{
      result["status"]  = 'success';
      result['message'] = 'Correct Login Details';
      result['data']    = results;
    }
    response.send(result);
  });

});

/* enter user data */



module.exports = router;

