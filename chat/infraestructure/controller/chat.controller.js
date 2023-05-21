const express = require('express');
const app = express();
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const { message_wpp } = require("../twillioConfig/twillio.config");

app.post("/webhook", async (req, res) => {
    const { body } = req;
    const { Body : incomingMessage, ProfileName: profileName } = body;
    console.log(body);
    console.log('-------------------------')
    console.log(profileName)
    console.log('-------------------------')
    const response = new MessagingResponse();  
    message_wpp(incomingMessage, profileName).then((resolve) => {
      console.log(resolve);
      res.send("ok");
    });
  });
  
  module.exports = app;