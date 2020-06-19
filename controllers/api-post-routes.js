const db = require('../models');
const moment = require('moment');

module.exports = function(app){
    //Create a post
    app.post('/api/post', (req, res) => {
        db.Post.create({
            body: req.body.body,
            authorId: req.user.id,
            author: req.user.username,
            squawkTime: moment().tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a')
        }).then((result) => {
            res.json(result);
        })
    })

    app.get('/api/post/:author', (req, res) => {
        let author = req.params.author;
        db.Post.findAll({where: {author: author}}).then((result) => res.json(result));
    })

    app.delete('/api/post/:id', (req, res) => {
        let postId = req.params.id;
        db.Post.destroy({where: {id: postId}}).then((result) => res.json(result));
    })

    //Likes/dislikes
    app.put('/api/post/:id/:like', (req, res) => {
        //:like will be either like or unlike
        let likeDirection = req.params.like;
        let postId = req.params.id;
        let likeAmount;
        db.Post.findOne({where: {id: postId}}).then((result) => {
            likeAmount = result.likes;
            if(likeDirection === "like"){
                likeAmount++;
            } else {
                likeAmount--;
            }
            result.likes = likeAmount;
            result.save();
        })
    })
}