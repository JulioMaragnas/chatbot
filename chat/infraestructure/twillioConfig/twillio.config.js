const accountSid = 'ACc99825afe205554607d966a7f1049c11';
const authToken = 'f3d5a94986f572a1787e84c8e1917d26';

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