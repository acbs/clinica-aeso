module.exports = function (app) {

    var Medico = app.models.medico
    
    var MedicoController = {

        index: function (req, res) {  
            Medico.find({ especialidade:  req.params.especialidade}, function (err, dados) {
                res.json(dados);
            });
        }
    }
    
    return MedicoController;
}