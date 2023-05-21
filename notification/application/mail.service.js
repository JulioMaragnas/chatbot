const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "notificacionesgoldie@gmail.com",
    pass: "ucotgpstmzbienww",
  },
});

const template = (text) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>NodeMailer Email Template</title>
        <style>
          .container {
            width: 100%;
            height: 100%;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .email {
            width: 80%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
          }
          .email-header {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
          }
          .email-body {
            padding: 20px;
          }
          .email-footer {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email">
            <div class="email-header">
              <h1>EMAIL HEADER</h1>
            </div>
            <div class="email-body">
              <p>${text}</p>
            </div>
            <div class="email-footer">
              <p>EMAIL FOOTER</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

const sendEmail = async (mailDetails, callback) => {
  try {
    const { text } = mailDetails;
    const options = { ...mailDetails, html: template(text) };
    const info = await transporter.sendMail(options);
    callback(info);
  } catch (error) {
    console.log(error);
  }
};

module.exports.sendEmail = sendEmail;

// app.get("/sendNotification", async (req, res) => {
//   const message = 'Esto es una prueba de envío de notificaciones por medio de gmail.'
//   const options = {
//     from: "GOLDIE🤖 from gts <notificacionesgoldie@gmail.com>", // sender address
//     to: "julioalbertocano@gmail.com", // receiver email
//     subject: "Send email in Node.JS with Nodemailer using Gmail account", // Subject line
//     text: message
//   }

//   sendEmail(options, (info) => {
//     console.log(`se ha enviado el mensaje ${info.messageId}`);
//     res.send('ok');
//   })
// });
