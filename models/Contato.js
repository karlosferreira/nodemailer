const mongoose = require('../database');


const ContatoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    sector: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
});


module.exports = mongoose.model('Contato', ContatoSchema);