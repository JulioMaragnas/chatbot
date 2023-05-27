const express = require('express');
const app = express();
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const { message_wpp } = require("../twillioConfig/twillio.config");
const { notificationCommand: { sendEmail } } = require('../../../notification/infraestructure/commands.infraestructure');

app.post("/webhook", async (req, res) => {
    const { body } = req;
    const { Body : incomingMessage, ProfileName: profileName, WaId } = body;

    const response = new MessagingResponse();  
    message_wpp(incomingMessage.toLowerCase(), profileName, WaId).then((resolve) => {
      res.send("ok");
    });
  });
  
  app.get('/sendemail', async(req, res)=>{
    const mailDetails = {
      text: 'Este texto es el que va a mostrar toda la información del correo',
      person: 'Julio Alberto Cano López'
    } ;
    await sendEmail(mailDetails, 'recruiting', (info)=> {
      console.log(`message sent with id ${info.messageId}`)
      res.send('ok');
    })
  });
  
  module.exports = app;