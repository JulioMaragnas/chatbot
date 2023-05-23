//TODO: pendiente configurar las variables del ambiente porque user y pass deben ir ahí
const nodemailer = require('nodemailer');

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
  
  module.exports.transporter = transporter;