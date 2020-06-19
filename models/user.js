// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //Username of the user
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      len: [1, 25]
    },
    
    //Name of the account
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [5, 50]
    },

    //Bio of the account
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
      len: [5, 200]
    },

    //Location of the User
    location: {
      type: DataTypes.STRING
    },

    //Link to the profile picture
    profilePic: {
      type: DataTypes.STRING,
      defaultValue: 'https://3.bp.blogspot.com/-qDc5kIFIhb8/UoJEpGN9DmI/AAAAAAABl1s/BfP6FcBY1R8/s1600/BlueHead.jpg'
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};












// const bcrypt = require('bcryptjs');

// module.exports = function(sequelize, dataTypes) {
//     const User = sequelize.define("User", {
//         username: {
//             type: dataTypes.STRING,
//             allowNull: false,
//             unique: true,
//             validate: {
//                 len: [1, 30],
//                 notContains: ' ',
//             }
//         },
//         password: {
//             type: dataTypes.STRING
//         },
//         email: {
//             type: dataTypes.STRING,
//             isEmail: true,
//             unique: true
//         },
//         bio: {
//             type: dataTypes.STRING,
//             validate: {
//                 len: [1, 200]
//             }
//         }
//     })

//     User.prototype.validPassword = function(password) {
//         return bcrypt.compareSync(password, this.password);
//     }

//     User.addHook('beforeCreate', (user) => {
//         user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
//     })

//     // User.associate = function(models) {
//     //     User.hasMany(models.post, {
//     //         onDelete: "cascade"
//     //     })
//     // }

//     return User;
// }