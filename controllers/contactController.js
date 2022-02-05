const Mailer = require('../models/Mailer');
const Contato = require('../models/Contato');


/**
 * Lista contatos
 */
const index = async (req, res) => {
    try {
        const contatos = await Contato.find({});
        return res.send({ contatos });
    } catch (err) {
        return res.status(400).send({ error: 'O banco de dados recusou a requisição' });
    }
};


/**
 * Dispara um novo email
 */
const sendMail = (req, res) => {
    let mailFrom = 'contato@infochd.com.br';

    switch (req.body[1].subject){
        case 'atendimento': {
            mailFrom = 'contato@infochd.com.br';
            break;
        }
        case 'dev': {
            mailFrom = 'desenvolvedor2@dt3.com.br';
            break;
        }
        case 'garantia': {
            mailFrom = 'garantia@dt3.com.br';
            break;
        }
        case 'vendas': {
            mailFrom = 'comercial@infochd.com.br';
            break;
        }
        case 'marketing': {
            mailFrom = 'marketing@dt3.com.br';
            break;
        }
        case 'ouvidoria': {
            mailFrom = 'ouvidoria@infochd.com.br';
            break;
        }
        default: {
            mailFrom = 'contato@infochd.com.br';
        }
    }

    const mailOptions = {
        from: req.body[1].email,
        to: mailFrom,
        subject: req.body[2].subject,
        text: 'Mensagem enviada do formulário de contato da InfoCHD por: ' + req.body[0].name + ' \r\n ' +
            req.body[3].message
    };

    try {
        Mailer.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err);
            }
            console.log('Novo E-mail disparado:');
            console.log(info);
            res.status(200).send(info);
        });
        return res.send(mailOptions);
    } catch (err) {
        return res.status(400).send({ error: 'E-mail não enviado. O servidor de disparos recusou' });
    }
};



/**
 * Envia um novo e-mail
 */
const business = (req, res) => {
    const mailFrom = 'contato@infochd.com.br';
    const email = 'naoresponda@infochd.com.br';
    const body = req.body.join('');

    const mailOptions = {
        from: email,
        to: mailFrom,
        subject: req.body.subject,
        html: body.toString()
    };

    try {
        Mailer.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err);
            }
            console.log('Cadastro de empresa enviado:');
            console.log(info);
        });
        return res.send(mailOptions);
    } catch (err) {
        return res.status(400).send({ error: 'E-mail não enviado. O servidor de disparos recusou' });
    }
};



/**
 * Cadastro de novas revendas - InfoCHD
 */
const resale = (req, res) => {
    let mailTo = 'fernanda.rocha@infochd.com.br';
    let mailBody = '';
    let i = 1;

    for ( i==1; i < 30; i++ ) {
        mailBody += req.body[i].name  + ': ' + req.body[i].value  + '\r\n';
    }

    const mailOptions = {
        from: 'contato@infochd.com.br',
        to: mailTo,
        subject: 'Cadastro de revenda',
        text: 'Cadastro realizado no site infochd.com.br. \r\nDados da Empresa: \r\n' + mailBody
    };

    try {
        Mailer.sendMail(mailOptions, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('Novo E-mail disparado:  ' + mailBody);
        });
        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'E-mail não enviado. O servidor de disparos recusou' + err });
    }
};


/**
 * Envia nova mensagem de whatsapp
 */
const whatsapp = (req, res) => {
    const accountSid = 'AC32bd4aa84bd67a6b0917020e13893636';
    const authToken = '1ebea5d0fcd7ebed8a5866730d96ae92';
    const twilio = require('twilio')(accountSid, authToken);

    twilio.messages
        .create({
            from: 'whatsapp:+14155238886',
            body: req.body.text,
            to: 'whatsapp:'+req.body.target
        })
        .then((message) => res.status(200).send(message));
};


/**
 * Envia um novo e-mail - DT3App
 */
const app = (req, res) => {
    let mailFrom = 'contato@infochd.com.br';

    switch (req.body.subject){
        case 'atendimento': {
            mailFrom = 'contato@infochd.com.br';
            break;
        }
        case 'dev': {
            mailFrom = 'desenvolvedor2@dt3.com.br';
            break;
        }
        case 'garantia': {
            mailFrom = 'garantia@dt3.com.br';
            break;
        }
        case 'vendas': {
            mailFrom = 'comercial@infochd.com.br';
            break;
        }
        case 'marketing': {
            mailFrom = 'marketing@dt3.com.br';
            break;
        }
        case 'ouvidoria': {
            mailFrom = 'ouvidoria@infochd.com.br';
            break;
        }
        default: {
            mailFrom = 'contato@infochd.com.br';
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
                return console.log(err);
            }
            console.log('Novo E-mail disparado:');
            console.log(info);
            res.status(200).send(info);
        });
        return res.send(mailOptions);
    } catch (err) {
        return res.status(400).send({ error: 'E-mail não enviado. O servidor de disparos recusou' });
    }
};


module.exports = {
    index,
    sendMail,
    business,
    resale,
    whatsapp,
    app,
};