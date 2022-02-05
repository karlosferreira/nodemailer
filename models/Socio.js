const mongoose = require('../database');


const SocioSchema = new mongoose.Schema({
    empresaId: {
        type: String,
        require: true
    },
    nomeCompleto: {
        type: String,
        require: true
    },
    cpf: {
        type: Number,
        require: true
    },
    rg: {
        type: Number,
        require: true
    },
    dataNascimento: {
        type: String,
        require: true
    }
});


module.exports = mongoose.model('Socio', SocioSchema);