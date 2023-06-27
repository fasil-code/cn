// // SMTP Client implementation using Node.js

// const nodemailer = require('nodemailer');

// function sendEmail(recipient, subject, message) {
//   // Create a SMTP transporter
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'zargerfasil123@gmail.com',
//       pass: 'wnkkbihlwomebczv'
//     }
//   });

//   // Define the email options
//   const mailOptions = {
//     from: 'zargerfasil123@gmail.com',
//     to: recipient,
//     subject: subject,
//     text: message
//   };

//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error occurred while sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// }
// sendEmail('zargerfasil123@gmail.com', 'Hello', 'This is a test email.');
// module.exports = sendEmail;
// // Example usage

// HTTP Client implementation using XMLHttpRequest

const nodemailer = require('nodemailer');

function sendEmail(recipient, subject, message) {
  // Create a SMTP transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zargerfasil123@gmail.com',
    pass: 'egqrkliallctdxdo'
    }
  });

  // Define the email options
  const mailOptions = {
    from: 'zargerfasil123@gmail.com',
    to: recipient,
    subject: subject,
    text: message
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred while sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Example usage
const recipient = 'example@example.com';
const subject = 'Test Email';
const message = 'This is a test email';

// sendEmail(recipient, subject, message);

