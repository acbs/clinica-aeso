var mongoose = require('mongoose');

module.exports = function () {
    var especialidadeSchema = mongoose.Schema({
        descricao: { type: String, required: true, unique: true },
        data_cad: { type: Date, default: Date.now }
    });

    return mongoose.model('Especialidade', especialidadeSchema);
}