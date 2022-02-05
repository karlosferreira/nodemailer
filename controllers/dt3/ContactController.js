const Mailer = require('../../models/Mailer');
const ContactSchema = require('../../schemas/dt3/ContactSchema');


const CODE = {
  OK: 'OK',
  VALIDATION: 'VALIDATION',
  SERVER_ERROR: 'SERVER_ERROR',
};


const sendMail = async (request, response) => {
  const { name, email, destination, subject, message, origin } = request.body;
  const values = { name, email, destination, subject, message, origin };

  try {
    await ContactSchema.validate(values);
  } catch (validationError) {
    const { message, path, type } = validationError;
    const error = { path, type, message, code: CODE.VALIDATION };

    return response
      .status(400)
      .send({ error });
  }

  const sender = { name, email, subject, message };
  const recipient = { email: destination, url: origin };

  const mailOptions = {
    from: `${sender.name} <${sender.email}>`,
    to: recipient.email,
    subject: sender.subject,
    text: sender.message + '\n\r' +
      '---------------------------' + '\n\r' +
      `Mensagem enviada através do formulário de contato em ${recipient.url}`
  };

  try {
    await Mailer.sendMail(mailOptions);
    return response
      .status(200)
      .json({ success: {
        message: 'Mail sent',
        code: CODE.OK,
      } });
  } catch(exception) {
    console.log(exception);
    return response
    .status(500)
    .json({ error: {
      message: 'Internal server error',
      code: CODE.SERVER_ERROR
    } });
  }
};


module.exports = {
  sendMail,
};
