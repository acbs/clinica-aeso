module.exports = function (app) {

    var Agendamento = app.controllers.agendamento;
    
    // Rota para carregar tela principal dos agendamentos
    app.route('/agendamento').get(Agendamento.index);

    // Rota para cadastrar agendamentos
    app.route('/agendamento/create').get(Agendamento.create).post(Agendamento.post);	
}