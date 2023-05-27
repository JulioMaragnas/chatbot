const { transporter } = require('../infraestructure/transporter/email.transporter');
const { template } = require('./template');
const {recipients} = require('./recipients.service')

const sendEmail = async (mailDetails, recipientType, callback) => {
  const { text, person } = mailDetails;
  const { header, subject, recipient } = await(recipients(recipientType, person));
  
  // console.log(mailDetails)
  // console.log(header)
  // console.log(subject)
  // console.log(recipient)
  
  try {
    const options = {
      text,
      html: template(text, header),
      to: recipient,
      from: 'GOLDIE👨‍💻 from gts <notificacionesgoldie@gmail.com>',
      subject,
    };
    const info = await transporter.sendMail(options);
    callback(info);
  } catch (error) {
    console.log(error);
  }
};

module.exports.sendEmail = sendEmail;

