const accountSid = 'ACc99825afe205554607d966a7f1049c11';
const authToken = 'fbac5aaac911d0edd0d3a2f6f9985083';

const client = require("twilio")(accountSid, authToken);
const {answerService: { answerScript }} = require('../../application/answer.service')

const message_wpp = async (incomingMessage, profileName, key) =>
  client.messages
    .create({
      body: await answerScript(incomingMessage, profileName),
      from: "whatsapp:+573506249547",
      to: `whatsapp:+${key}`,
    });

module.exports.message_wpp = message_wpp;