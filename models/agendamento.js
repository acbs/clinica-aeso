var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {
    var pacienteSchema = new Schema({ 
        paciente: { type: Schema.Types.ObjectId, ref: 'Paciente' }
    });
    var agendamentoSchema = Schema({
        paciente: [pacienteSchema],
        especialidade: String,
        medico: String,
        valor: Number,
        data: String,
        data_cad: { type: Date, default: Date.now }
    });

    return mongoose.model('Agendamento', agendamentoSchema);
}