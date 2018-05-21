module.exports = function (app) {

    var Usuarios = app.models.usuarios;

    var UsuarioController = {
        index: function (req, res) {
            Usuarios.find(function (err, dados) {
                if (err) {
                    console.log('---> Erro ao buscar os usuarios');
                    res.redirect('/usuarios');
                } else {
					res.render('usuarios/index', { lista: dados });
				}
            });
        },

        create: function (req, res) {
            res.render('usuarios/create')
        },

        post: function (req, res) {
			console.log('chegou aqui');
			var usuarios = new Usuarios(req.body);
            usuarios.save(function (err) {
                if (err) {
					console.log('---> Erro ao salvar usuario');
                    res.render('usuarios/create', { user: req.body });
				} else {
					console.log('---> Usuario salvo com sucesso');
					res.redirect('/usuarios');
				}
            });
        },

        show: function (req, res) {
            Usuarios.findById(req.params.id, function (err, dados) {
				if (err) {
					console.log('---> Erro ao exibir usuario');
					res.redirect('/usuarios');
				} else {
					res.render('usuarios/show', { dados: dados });
                }
            });
        },

        delete: function (req, res) {
            Usuarios.remove({ _id: req.params.id }, function (err) {
				if (err) {
					console.log('---> Erro ao excluir usuario');
					res.redirect('/usuarios');
				} else {
					console.log('---> Usuario deletado com sucesso');
					res.redirect('/usuarios');
				}
            });
        },
        
        edit: function (req, res) {
        	Usuarios.findById(req.params.id, function (err, dados) {
        		if (err) {
        			console.log('---> Erro ao editar usuarios');
                    res.redirect('/usuarios');
                } else {
                    console.log('---> Usuario editado com sucesso');
                    res.render('usuarios/edit', { dados: dados });
                }
            });
		},
		
		update: function (req, res) {
			Usuarios.findById(req.params.id, function (err, dados) {
				var usuarios = dados;
				usuarios.nome = req.body.nome;
				usuarios.cpf = req.body.cpf;
				usuarios.dataNascimento = req.body.dataNascimento;
				usuarios.email = req.body.email;
				usuarios.telefone = req.body.telefone;

				usuarios.save(function (err) {
                	if (err) {
                		console.log('---> Erro ao atualizar o usuario');
                		res.render('usuarios/edit', { user: req.body });
                	} else {
                		console.log('---> Usuario atualizado com sucesso');
                		res.redirect('/usuarios');
                	}
                });
			});
		}
	}
    return UsuarioController;
}