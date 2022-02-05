const mongoose = require('../database');

const BancoSchema = new mongoose.Schema({
    empresaId: {
        type: String,
        require: true
    },
    banco: {
        type: String,
        require: true
    },
    agencia: {
        type: Number,
        require: true
    },
    conta: {
        type: Number,
        require: true
    },
    gerente: {
        type: String,
        require: true
    },
    telefone: {
        type: Number,
        require: true
    }
});

module.exports =  mongoose.model('Banco', BancoSchema);