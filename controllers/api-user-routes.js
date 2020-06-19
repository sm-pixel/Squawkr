const bcrypt = require("bcryptjs")
const db = require('../models');
const passport = require("../config/passport");

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create(req.body)
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for changing user info
  app.put("/api/update", function (req, res) {
    //Find the user with the currently logged in username
    db.User.findOne({ where: { username: req.user.username } }).then((result) => {
      //Updaate the found user
      result.update({
        name: req.body.name,
        location: req.body.location,
        bio: req.body.bio,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null),
        profilePic: req.body.profilePic
      }).then(function (result2) {
        //Login as the updated user
        req.logIn(result2, function (err) {
          if (err) throw err;
          res.json(result2);
        });
      })
    })
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        id: req.user.id,
        bio: req.user.bio,
        name: req.user.name,
        location: req.user.location,
        profilePic: req.user.profilePic
      });
    }
  });

  //Gets the profile of a specific author
  app.get('/profile/:author', (req, res) => {
    //Holder variables
    let paramUser = req.params.author;
    let userResult;
    //Find user with specific username
    db.User.findOne({ where: { username: paramUser } }).then((result) => {
      userResult = result.dataValues;
      //Then find all of the posts with that author
      db.Post.findAll({ where: { author: paramUser } }).then((result2) => {
        //Hold the found posts in this holder variable
        let holder = [];
        for (let i = result2.length - 1; i >= 0; i--) {
          holder.push(result2[i].dataValues);
        }
        //Render the otherProfile page passing in the post holder and the found user
        res.render('otherProfile', { post: holder, user: userResult });
      })
    })
  })

  //Delete a user with a specific id
  app.delete('/api/user/:id', (req, res) => {
    let userId = req.params.id;
    db.User.destroy({ where: { id: userId } }).then((result) => res.json(result));
  })
}