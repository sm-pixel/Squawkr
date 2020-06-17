const db = require('../models');

module.exports = function(app){
    app.get('/', (req, res) => {
        res.render('login')
    })

    app.get('/login', (req, res) => {
        res.render('login')
    })


    app.get('/signup', (req, res) => {
        res.render('signup');
    })

    app.get('/home', (req, res) => {
        db.Post.findAll().then((result) => {
            console.log(result);
            res.render('home', {post: result});
        })
    })

    app.get('/profile', (req, res) => {
        res.render('profile');
    })
}