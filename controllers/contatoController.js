const express = require('express');
const Mailer = require('../models/Mailer')
const router = express.Router();

router.post('/', (req, res) => {

    const mailFrom = 'mailer@computerhospital.com.br';

    const mailOptions = {
        from: req.body[0].email,
        to: mailFrom,
        subject: "Nova mensagem da Affal ( "+req.body[0].sector+" )",
        text: req.body[0].message
    };

    console.log(mailOptions);

    try {
        Mailer.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err)
            }            
            console.log('Novo E-mail disparado:');
            console.log(info)
        });
        return res.send(info);
    } catch (err) {
        return res.status(400).send({ error: 'E-mail não enviado. O servidor de disparos recusou' })
    }
});

router.post('/business', (req, res) => {

    const mailFrom = 'mailer@computerhospital.com.br';
    const email = 'naoresponda@infochd.com.br';
    const body = req.body.join("");
  
    const mailOptions = {
        from: email,
        to: mailFrom,
        subject: req.body.subject,
        html: body.toString()
    };

    try {
        Mailer.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err)
            }
            console.log('Cadastro de empresa enviado:');
            console.log(info)
        })
        return res.send(mailOptions);
    } catch (err) {
        return res.status(400).send({ error: 'E-mail não enviado. O servidor de disparos recusou' })
    }

});

router.post('/whatsapp', (req, res) => {
    const accountSid = 'AC32bd4aa84bd67a6b0917020e13893636';
    const authToken = '1ebea5d0fcd7ebed8a5866730d96ae92';
    const twilio = require('twilio')(accountSid, authToken);

    twilio.messages
        .create({
            from: 'whatsapp:+14155238886',
            body: req.body.text,
            to: 'whatsapp:'+req.body.target
        })
        .then(message => res.status(200).send(message));
    }
);

router.post('/AppDT3', (req, res) => {
    // return res.send(req.body);
    // const mailFrom = 'desenvolvedor2@dt3.com.br';

    switch (req.body.subject){
        case "atendimento": {
            mailFrom = "atendimento@dt3sports.com.br";
            break;
        }
        case "dev": {
            mailFrom = "desenvolvedor2@dt3.com.br";
            break;
        }        
        case "garantia": { 
            mailFrom = "garantia@dt3sports.com.br";
            break;
            //Check
        }
        case "vendas": { 
            mailFrom = "vendas@dt3sports.com.br";
            break;
            //Check
        }
        case "marketing": { 
            mailFrom = "marketing@dt3sports.com.br";
            break;
            //Check
        }
        case "ouvidoria": {
            mailFrom = "ouvidoria@dt3sports.com.br";
            break;
        }
        default: {
            mailFrom = "atendimento@dt3sports.com.br";
        }
    }

    const mailOptions = {
        from: req.body.email,
        to: mailFrom,
        subject: req.body.subject,
        text: req.body.message
    };

    try {
        Mailer.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err)
            }            
            console.log('Novo E-mail disparado:');
            console.log(info);
            res.status(200).send(info)
        });
        return res.send(mailOptions);
    } catch (err) {
        return res.status(400).send({ error: 'E-mail não enviado. O servidor de disparos recusou' })
    }

});

module.exports = app => app.use('/contato', router);