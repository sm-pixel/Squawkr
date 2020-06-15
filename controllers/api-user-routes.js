const db = require('../models');

module.exports = function(app){
    app.post('/api/user', (req, res) => {
        db.User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }).then((result) => {
            res.json(result);
        })
    })
}