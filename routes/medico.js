module.exports = function (app) {

    var Medico = app.controllers.medico;
    
    // Rota para carregar os médicos
    app.route('/medico/:especialidade').get(Medico.index);
    
}