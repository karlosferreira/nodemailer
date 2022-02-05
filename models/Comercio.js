const mongoose = require('../database');


const ComercioSchema = new mongoose.Schema({
    empresaId: {
        type: String,
        require: true
    },
    nome: {
        type: String,
        require: true
    },
    contato: {
        type: String,
        require: true
    },
    telefone: {
        type: Number,
        require: true
    },
    uf: {
        type: String,
        require: true
    },
    cidade: {
        type: String,
        require: true
    }
});


module.exports = mongoose.model('Comercio', ComercioSchema);