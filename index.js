require('./chat/infraestructure/cache/cache.config')

const config = require("./index.config");
const express = require("express");
const morgan = require("morgan");
const parser = require("body-parser");
const {cache} = require('./chat/infraestructure/cache/cache.config');

const app = express();

app.set("port", config.PORT);
app.set("host", config.HOST);

app.use(parser.urlencoded({ extended: false }));
app.use(express.json());
app.use(require('./chat/infraestructure/controller/chat.controller'))

console.log(`NODE_ENV=${config.NODE_ENV}`);
console.log(`PORT=${config.PORT}`);
console.log(`HOST=${config.HOST}`);

app.get("/:numberReq", (req, res) => {
  res.json("hello fuckin world");
  const { params: { numberReq } } = req;
  cache.set(`${numberReq}`, {number: numberReq});
  
});

app.get("/", (req, res) => {
  res.json("hello fuckin world");
  console.log(cache.keys());
});


app.listen(app.get("port"),app.get('host'), () => {
  console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
});