const accountSid = "ACc99825afe205554607d966a7f1049c11";
const authToken = "afbfb0defad986e21de9076c19bfaa23";
const client = require("twilio")(accountSid, authToken);
const {answerService: { answerScript }} = require('./answerScript.service')

const message_wpp = (incomingMessage, profileName) =>
  client.messages
    .create({
      body: answerScript(incomingMessage, profileName),
      from: "whatsapp:+14155238886",
      to: "whatsapp:+573217717939",
    });

module.exports.message_wpp = message_wpp;