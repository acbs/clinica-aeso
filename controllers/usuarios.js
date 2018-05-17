module.exports = function (app) {

    var Usuarios = app.models.usuarios;

    var UsuarioController = {
        index: function (req, res) {
            Usuarios.find(function (err, dados) {
                console.log(err);
                res.render('usuarios/index', { lista: dados })
            });
        },

        create: function (req, res) {
            res.render('usuarios/create')
        },

        post: function (req, res) {
            var usuarios = new Usuarios(req.body);
            console.log(usuarios);
            usuarios.save(function (err) {
                console.log(err);
                res.redirect('/usuarios');
            });
        },

        show: function (req, res) {
            Usuarios.findById(req.params.id, function (err, dados) {
                res.render('usuarios/show', { dados: dados });
            });
        },

        delete: function (req, res) {
            Usuarios.remove({ _id: req.params.id }, function (err) {
                res.redirect('/usuarios');
            });
        }
    }
    return UsuarioController;
}