module.exports = function (app) {

    var usuarios = app.controllers.usuarios;
    
    // Rota para carregar tela principal dos usuários
    app.route('/usuarios').get(usuarios.index);

    // Rota para cadastrar usuários
    app.route('/usuarios/create').get(usuarios.create).post(usuarios.post);

    // Rota para remover
    app.route('/usuarios/delete/:id').post(usuarios.delete);
    
    // Rota para o metodo show
    app.route('/usuarios/show/:id').get(usuarios.show);

    // Rota para deletar
    app.route('/usuarios/delete/:id').post(usuarios.delete);

    // Rota para editar / update 
    app.route('/usuarios/edit/:id').get(usuarios.edit).post(usuarios.update);
	
}