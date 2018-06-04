module.exports = function (app) {

    var Paciente = app.models.paciente;

	var PacienteController = {
        index: function (req, res) {
			Paciente.find(function (err, dados) {
                if (err) {
                    console.log('\n-----> Erro ao buscar os pacientes\n');
                    res.redirect('/paciente');
                } else {
					res.render('paciente/index', { lista: dados });
				}
            });
        },

        create: function (req, res) {
			res.render('paciente/create', { paciente: new Paciente() });
        },

        post: function (req, res) {
			var paciente = new Paciente(req.body);
            paciente.save(function (err) {
                if (err) {
					if (err.code == 11000 ) {
						res.render('paciente/create', { 
							paciente: req.body, 
							msg: 'Ja existe um cadastro com este CPF ' + paciente.cpf 
						});
						console.log('\n-----> Ja existe um cadastro com este CPF '+ paciente.cpf + '\n');
					} else {
						console.log('\n-----> Erro ao salvar paciente ' + err);
						res.render('paciente/create', { 
							paciente: req.body, 
							msg: 'Desculpe houve um erro ao salvar paciente, tente novamente!'
						});
					}
				} else {
					console.log('\n-----> Paciente salvo com sucesso\n');
					res.redirect('/paciente');
				}
            });
        },

        show: function (req, res) {
            Paciente.findById(req.params.id, function (err, dados) {
				if (err) {
					console.log('\n-----> Erro ao exibir paciente\n');
					res.redirect('/paciente');
				} else {
					res.render('paciente/show', { dados: dados });
                }
            });
        },

        delete: function (req, res) {
            Paciente.remove({ _id: req.params.id }, function (err) {
				if (err) {
					console.log('\n-----> Erro ao excluir paciente\n');
					res.redirect('/paciente');
				} else {
					console.log('\n-----> Paciente deletado com sucesso\n');
					res.redirect('/paciente');
				}
            });
        },
        
        edit: function (req, res) {
        	Paciente.findById(req.params.id, function (err, dados) {
        		if (err) {
        			console.log('\n-----> Erro ao buscar paciente para editar\n');
                    res.redirect('/paciente');
                } else {
                    res.render('paciente/edit', { paciente: dados });
                }
            });
		},
		
		update: function (req, res) {
			Paciente.findById(req.params.id, function (err, dados) {
				var paciente = dados;
				paciente.nome = req.body.nome;
				paciente.dataNascimento = req.body.dataNascimento;
				paciente.email = req.body.email;
				paciente.telefone = req.body.telefone;

				paciente.save(function (err) {
                	if (err) {
                		console.log('\n-----> Erro ao atualizar o paciente\n');
                		res.render('paciente/edit', { paciente: req.body });
                	} else {
                		console.log('\n-----> Paciente atualizado com sucesso\n');
                		res.redirect('/paciente');
                	}
                });
			});
		}
	}
	return PacienteController;
}