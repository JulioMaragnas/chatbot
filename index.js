const express = require("express");
const morgan = require("morgan");
const { message_wpp } = require("./wpp.config");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const twilio = require("twilio");

const accountSid = "ACc99825afe205554607d966a7f1049c11";
const authToken = "afbfb0defad986e21de9076c19bfaa23";
const client = require("twilio")(accountSid, authToken);

const app = express();
const parser = require("body-parser");

app.set("port", process.env.PORT || 5000);

app.use(parser.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello fuckin world");
});

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

app.listen(app.get("port"), () => {
  console.log(`server listening on port ${app.get("port")}`);
});

// const twilio = require("twilio");
// const bodyParser = require("body-parser");
// const MessagingResponse = require("twilio").twiml.MessagingResponse;

// const authToken = 'afbfb0defad986e21de9076c19bfaa23';
// const account_sid="ACc99825afe205554607d966a7f1049c11"

// const express = require("express");
// const app = express();
// const port = 5000;

// app.use(
//   bodyParser.json({
//     verify: (req, res, buf) => {
//       req.rawBody = buf;
//     },
//   })
// );

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.post("/message", twilio.webhook(authToken), (req, res) => {
//   // Twilio Messaging URL - receives incoming messages from Twilio
//   const response = new MessagingResponse();

//   response.message(`Your text to me was ${req.body.Body}.
//                     Webhooks are neat :)`);

//   res.set("Content-Type", "text/xml");
//   res.send(response.toString());
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
