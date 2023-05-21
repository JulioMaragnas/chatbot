const config = require("./index.config");
const express = require("express");
const morgan = require("morgan");
const parser = require("body-parser");

const app = express();

app.set("port", config.PORT);
app.set("host", config.HOST);

app.use(parser.urlencoded({ extended: false }));
app.use(express.json());
app.use(require('./chat/infraestructure/controller/chat.controller'))


console.log(`NODE_ENV=${config.NODE_ENV}`);



// const { message_wpp } = require("./wpp.config");
// const MessagingResponse = require("twilio").twiml.MessagingResponse;
const { sendEmail } = require("./mail.service")
// const twilio = require("twilio");

// const accountSid = "ACc99825afe205554607d966a7f1049c11";
// const authToken = "afbfb0defad986e21de9076c19bfaa23";
// const client = require("twilio")(accountSid, authToken);




app.get("/", (req, res) => {
  res.json("hello fuckin world");
});

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

// app.post("/webhook", async (req, res) => {
//   const { body } = req;
//   const { Body : incomingMessage, ProfileName: profileName } = body;
//   console.log(body);
//   console.log('-------------------------')
//   console.log(profileName)
//   console.log('-------------------------')
//   const response = new MessagingResponse();

//   message_wpp(incomingMessage, profileName).then((resolve) => {
//     console.log(resolve);
//     res.send("ok");
//   });
// });

app.listen(app.get("port"),app.get('host'), () => {
  console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
});