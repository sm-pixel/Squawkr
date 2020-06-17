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
        if(req.user){
            db.Post.findAll().then((result) => {
                console.log(result.length);
                let holder = [];
                for(let i = result.length - 1; i >= 0; i--) {
                    holder.push(result[i].dataValues);
                }
                res.render('home', {post: holder});
            })
        } else {
            res.redirect('/');
        }
    })

    app.get('/profile', (req, res) => {
        if(req.user){
            res.render('profile');
        } else {
            res.redirect('/');
        }
    })
}