module.exports = function (app) {

    var Usuario = app.models.usuario;

    var HomeController = {
        index: function (req, res) {
            res.render('home/index');
        }
    }
    return HomeController;
}