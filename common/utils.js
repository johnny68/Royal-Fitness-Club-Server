const randomString = require('randomstring');
const nodemailer = require('nodemailer');


function createResult(error, data){
    var result = {};
    if (error == null){
        result['status'] = 'success';
        result[data]     =  data;
    }
    else{
        result ['status'] = ['error'];
    }
    return result;
}

function createPassword(){
    const password_generated = randomString.generate({
        length: 6,
        charset: 'alphanumeric'
      });

      return password_generated;
}

function createLink(request){
    const rand = randomString.generate({
        length: 12,
        charset: 'alphanumeric'
      });
      host = request.get('host');
      link = "http://" + request.get('host') + "/user/verify?id=" + rand;

      return link;
}

function createTransport() {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'siddhant.ghosh.5@gmail.com',
          pass: '9011392667'
        }
      });
      return transporter;
}

module.exports = {
    createResult: createResult,
    createPassword: createPassword,
    createLink: createLink,
    createTransport: createTransport
};