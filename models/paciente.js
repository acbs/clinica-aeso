var mongoose = require('mongoose');

module.exports = function () {
    var pacienteSchema = mongoose.Schema({
        nome: String,
        cpf: { type: String, required: true, unique: true },
        dataNascimento: String,
        email: String,
        telefone:  String,
        data_cad: { type: Date, default: Date.now }
    });

    return mongoose.model('Paciente', pacienteSchema);
}