const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post('/', (req, res) => {
  const { to, subject, body } = req.body;


  const htmlTemplatePath = path.join(__dirname, '../emailmessage.html');
  const htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf8');

 
  const htmlMessage = htmlTemplate
    .replace('{{subject}}', subject)
    .replace('{{body}}', `<p style="color: #007bff; margin: 0;">${body}</p>`);


  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: htmlMessage
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send(error.toString());
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent: ' + info.response);
  });
});

module.exports = router;
