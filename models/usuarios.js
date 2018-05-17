var mongoose = require('mongoose');

module.exports = function () {
    var usuarioSchema = mongoose.Schema({
        nome: String,
        cpf: String,
        dataNascimento: String,
        email: String,
        telefone:  String,
        data_cad: { type: Date, default: Date.now }
    });

    return mongoose.model('Usuarios', usuarioSchema);
}