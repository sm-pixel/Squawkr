const db = require('../models');

module.exports = function (app) {
    //Render login page on load
    app.get('/', (req, res) => {
        res.render('login')
    })

    //Render login page
    app.get('/login', (req, res) => {
        res.render('login')
    })

    //Render signup page
    app.get('/signup', (req, res) => {
        res.render('signup');
    })

    //If you're logged in, load update page otherwise load login page
    app.get('/update', (req, res) => {
        if (req.user) {
            res.render('update');
        } else {
            res.redirect('login');
        }
    })

    //If you're logged in render the home page passing in all of the posts, else going to the login page
    app.get('/home', (req, res) => {
        if (req.user) {
            db.Post.findAll().then((result) => {
                let holder = [];
                for (let i = result.length - 1; i >= 0; i--) {
                    holder.push(result[i].dataValues);
                }
                res.render('home', { post: holder });
            })
        } else {
            res.redirect('/');
        }
    })

    //If you're logged in render the profile page with the posts and info of your account, else go to the login
    app.get('/profile', (req, res) => {
        if (req.user) {
            db.Post.findAll({ where: { author: req.user.username } }).then((result) => {
                let holder = [];
                for (let i = result.length - 1; i >= 0; i--) {
                    holder.push(result[i].dataValues);
                }
                res.render('profile', { post: holder });
            })
        } else {
            res.redirect('/');
        }
    })

    //Load the profile of a particular account loading their posts and info
    app.get('/profile/:author', (req, res) => {
        if (req.user) {
            db.Post.findAll({ where: { author: req.params.author } }).then((result) => {
                let holder = [];
                for (let i = result.length - 1; i >= 0; i--) {
                    holder.push(result[i].dataValues);
                }
                res.render('profile', { post: holder });
            })
        } else {
            res.redirect('/');
        }
    })
}