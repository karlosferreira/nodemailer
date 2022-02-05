const Yup = require('yup');


const companySchema = Yup.object({
  cnpj: Yup.string()
    .required('Preencha o CNPJ'),
  name: Yup.string()
    .required('Preencha a razão social'),
  industry: Yup.string()
    .required('Preencha o ramo de atividade'),
  state_registration: Yup.string()
    .required('Preencha a inscrição estadual'),
  city_registration: Yup.string()
    .required('Preencha a inscrição municipal'),
  foundation: Yup.string()
    .required('Informe a data de fundação'),
  partners: Yup.array().of(
    Yup.string()
      .required('Informe o nome do sócio'),
  ),
});

const addressSchema = Yup.object({
  postcode: Yup.string()
    .required('Preencha o CEP'),
  street: Yup.string()
    .required('Preencha o endereço'),
  number: Yup.string()
    .required('Preencha o número do endereço'),
  neighborhood: Yup.string()
    .required('Preencha o bairro'),
  city: Yup.string()
    .required('Informe a cidade'),
  state: Yup.string()
    .required('Informe o estado'),
});

const contactSchema = Yup.object({
  name: Yup.string()
    .required('Informe o nome do contato'),
  phone: Yup.string()
    .required('Informe o telefone')
    .min(14, 'Informe um telefone válido')
    .max(15, 'Informe um telefone válido'),
  email: Yup.string()
    .required('Informe o email')
    .email('Informe um e-mail válido'),
});

const schema = Yup.object({
  company: companySchema,
  address: addressSchema,
  contact: contactSchema,
  origin: Yup.string()
    .required('Informe a url de origem da chamada'),
});


module.exports = schema;
