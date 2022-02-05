const mongoose = require('../database');

const EmpresaSchema = new mongoose.Schema({
    razaoSocial: {
        type: String,
        require: true
    },
    fundacao: {
        type: String,
        require: true
    },
    cnpj: {
        type: Number,
        require: true
    },
    inscricaoEstadual: {
        type: Number,
        require: true
    },
    inscricaoMunicipal: {
        type: Number,
        require: true
    },
    cep: {
        type: Number,
        require: true
    },
    endereco: {
        type: String,
        require: true
    },
    numero: {
        type: Number,
        require: true
    },
    bairro: {
        type: String,
        require: true
    },
    municipio: {
        type: String,
        require: true
    },
    estado: {
        type: String,
        require: true
    },
    telefoneCelular: {
        type: String,
        require: true
    },
    telefoneFixo: {
        type: String,
        require: true
    },
    ramoAtividade: {
        type: String,
        require: true
    },
    contatoNome: {
        type: String,
        require: true
    },
    emailContato: {
        type: String,
        require: true
    }
});


module.exports = mongoose.model('Empresa', EmpresaSchema);