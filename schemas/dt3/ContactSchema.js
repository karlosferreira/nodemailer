const Yup = require('yup');


const schema = Yup.object({
  name: Yup.string()
    .required('Informe seu nome'),
  email: Yup.string()
    .required('Informe seu e-mail')
    .email('Informe um e-mail válido'),
  destination: Yup.string()
    .required('Escolha a área de atendimento'),
  subject: Yup.string()
    .required('Informe o motivo do contato'),
  message: Yup.string()
    .required('Preencha a mensagem'),
  origin: Yup.string()
    .required('Informe a origem do contato'),
});


module.exports = schema;
