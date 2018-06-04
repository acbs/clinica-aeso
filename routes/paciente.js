module.exports = function (app) {

    var Paciente = app.controllers.paciente;
    
    // Rota para carregar tela principal dos pacientes
    app.route('/paciente').get(Paciente.index);

    // Rota para cadastrar pacientes
    app.route('/paciente/create').get(Paciente.create).post(Paciente.post);

    // Rota para remover
    app.route('/paciente/delete/:id').post(Paciente.delete);
    
    // Rota para o metodo show
    app.route('/paciente/show/:id').get(Paciente.show);

    // Rota para deletar
    app.route('/paciente/delete/:id').post(Paciente.delete);

    // Rota para editar / update 
    app.route('/paciente/edit/:id').get(Paciente.edit).post(Paciente.update);
	
}