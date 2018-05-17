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

   /* // rota para o metodo delete passando o id na url
    app.route('/usuario/delete/:id').post(usuario.delete);
    //tentei usar o método delete na chamada mas por algum motivo ele não consegue executar
    //app.route('/usuario/delete/:id').delete(usuario.delete);

    // // rota para o metodo edit passando o id na url ou para o metodo update se houver um submit do form
    app.route('/usuario/edit/:id').get(autenticar, usuario.edit).post(usuario.update);
*/
}