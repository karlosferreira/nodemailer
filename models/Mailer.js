const nodemailer = require('nodemailer');


const Mailer = nodemailer.createTransport({
    host: 'host.computerhospital.com.br',
    port: 465,
    secure: true,
    auth: {
      user: 'mailer@infochd.com.br',
      pass: 'RACdfSb4jPrLD49'
    },
});


module.exports = Mailer;
