const Mailer = require('../../models/Mailer');
const ResaleSchema = require('../../schemas/dt3/ResaleSchema');


const CODE = {
  OK: 'OK',
  VALIDATION: 'VALIDATION',
  SERVER_ERROR: 'SERVER_ERROR',
};

const BREAKLINE = '\n\r';


const resale = async (request, response) => {
  try {
    await ResaleSchema.validate(request.body);
  } catch (validationError) {
    const { message, path, type } = validationError;
    const error = { path, type, message, code: CODE.VALIDATION };

    return response
      .status(400)
      .send({ error });
  }


  const { company, address, contact, origin } = request.body;

  let message = 'Uma empresa se cadastrou no site para se tornar uma revenda. Veja a seguir os dados da empresa:' +
                      BREAKLINE + BREAKLINE +
    '• Documentação'                                    + BREAKLINE +
    `CNPJ: ${company.cnpj}`                             + BREAKLINE +
    `Razão social: ${company.name}`                     + BREAKLINE +
    `Ramo de atividade: ${company.industry}`            + BREAKLINE +
    `Inscrição estadual: ${company.state_registration}` + BREAKLINE +
    `Inscrição municipal: ${company.city_registration}` + BREAKLINE +
    `Data de fundação: ${company.foundation}`           + BREAKLINE +
                      BREAKLINE + BREAKLINE +
    '• Socios' + BREAKLINE +
    `${company.partners.join(BREAKLINE)}` +
                      BREAKLINE + BREAKLINE +
    '• Endereço'                      + BREAKLINE +
    `CEP: ${address.postcode}`        + BREAKLINE +
    `Endereço: ${address.street}`     + BREAKLINE +
    `Número: ${address.number}`       + BREAKLINE +
    `Bairro: ${address.neighborhood}` + BREAKLINE +
    `Cidade: ${address.city}`         + BREAKLINE +
    `Estado: ${address.state}`        + BREAKLINE +
                      BREAKLINE + BREAKLINE +
    '• Responsável pelo contato' + BREAKLINE +
    `Nome: ${contact.name}`      + BREAKLINE +
    `Telefone: ${contact.phone}` + BREAKLINE +
    `E-mail: ${contact.email}`   + BREAKLINE +
                    BREAKLINE + BREAKLINE +
    '--------------------------------------' +
                    BREAKLINE + BREAKLINE +
    `Mensagem enviada através do formulário de revenda em ${origin}`;



  const sender = {
    name: `${contact.name} | ${company.name}`,
    email: contact.email,
    subject: '[DT3] Cadastro de revenda',
    message,
  };

  const mailOptions = {
    from: `${sender.name} <${sender.email}>`,
    to: 'desenvolvedor3@dt3.com.br',
    subject: sender.subject,
    text: sender.message,
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
    return response
    .status(500)
    .json({ error: {
      message: 'Internal server error',
      code: CODE.SERVER_ERROR
    } });
  }
};


module.exports = {
  resale,
};
