import { createTransport } from 'nodemailer';
import getText from './lang/get-text.js';
import errorHelper from './helpers/error-helper.js';
import { awsAccessKey, awsSecretAccessKey, awsRegion } from '../config/index.js';
import pkg from 'aws-sdk';
import  smtpTransport  from "nodemailer-smtp-transport";
const { config, SES } = pkg;

config.update({
  accessKeyId: awsAccessKey,
  secretAccessKey: awsSecretAccessKey,
  region: awsRegion
});

export default async (email, name, confirmCode, lang, type, req, res) => {
  new Promise(async (resolve, reject) => {
  
    if (!email || !confirmCode || (lang !== 'tr' && lang !== 'en')) {
      return res.status(400).send(errorHelper('00005', req)).end();
    }
    let transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
        auth: {
          user: 'dev.test.web.9x@gmail.com', // Địa chỉ email của bạn
          pass: 'brjg jlqj dbbz oimf' // Mật khẩu email của bạn
        }
    });

    let body = '';
    if (type == 'register') {
      body = `${getText(lang, 'welcomeCode')} ${name}!\r\n\r\n${getText(lang, 'verificationCodeBody')} ${confirmCode}`;
    } else {
      body = `${getText(lang, 'verificationCodeBody')} ${confirmCode}`;
    }

    const emailInfo = {
      from: 'An Đỗ',
      to: "doan.cdv@gmail.com",
      subject: getText(lang, 'verificationCodeTitle'),
      text: body
    };
    
    try {
      await transporter.sendMail(emailInfo);
      console.log("done")
      return resolve('Success');
    } catch (err) {
      console.log(err)
      return reject(err);
    }
  });
};
