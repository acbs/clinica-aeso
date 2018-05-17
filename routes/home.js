module.exports = function (app) {

    var home = app.controllers.home;
    
    app.route('/home').get(home.index);

}