module.exports = function (app) {

    var Agendamento = app.models.agendamento;
        Paciente = app.models.paciente;
        Especialidade = app.models.especialidade;
        Medico = app.models.medico;

	var AgendamentoController = {

        index: function (req, res) {       
            Agendamento.find(function (err, dados) {
                if (err) {
                    console.log('\n-----> Erro ao buscar os agendamentos\n');
                    res.redirect('/agendamento');
                } else {
					res.render('agendamento/index', { lista: dados });
				}
            });

            Agendamento.find({}).populate('pacientes').exec(function(err, dd) {
                console.log(' ');
                console.log(dd);
                console.log(' ');
            });
        },

        create: function (req, res) {
            Especialidade.find(function (err, dados) {
                res.render('agendamento/create', {
                     agendamento: new Agendamento(),
                     especialidades: dados,
                     medicos: new Medico()
                });
            });
        },

        post: function (req, res) {
            var agendamento = new Agendamento(req.body);
            const { nome, cpf, dataNascimento, email, telefone } = req.body;
            
            // Salvando o agendamento
            agendamento.save(function (err) {

                if(err) {
                    console.log('\n-----> Erro ao salvar agendamento ' + err);
                    res.redirect('/agendamento/create');
                } else {
                    // Salvando o paciente
                    var paciente = new Paciente({ nome, cpf, dataNascimento, email, telefone });
                    paciente.save();

                    // Adidionando o paciente no agendamento
                    agendamento.paciente.push(paciente);
                    agendamento.save();

                    console.log('\n-----> Agendamento salvo com sucesso\n');
                    res.redirect('/agendamento');
                }
            });
        }
    }
    
	return AgendamentoController;
}