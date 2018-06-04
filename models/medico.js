var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {
    var medicoSchema = Schema({
        nome: String,
        especialidade: String,
        data_cad: { type: Date, default: Date.now }
    });

    return mongoose.model('Medico', medicoSchema);
}