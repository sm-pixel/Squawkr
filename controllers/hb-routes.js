const db = require('../models');

module.exports = function(app){
    app.get('/' || '/login', (req, res) => {
        res.render('login')
    })

    app.get('/signup', (req, res) => {
        res.render('signup');
    })

    app.get('/home', (req, res) => {
        res.render('home');
    })
}