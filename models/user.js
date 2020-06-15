const bcrypt = require('bcryptjs');

module.exports = function(sequelize, dataTypes) {
    const User = sequelize.define("User", {
        username: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1, 30],
                notContains: ' ',
            }
        },
        password: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING,
            isEmail: true,
            unique: true
        },
        bio: {
            type: dataTypes.STRING,
            validate: {
                len: [1, 200]
            }
        }
    })

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    }

    User.addHook('beforeCreate', (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    })

    // User.associate = function(models) {
    //     User.hasMany(models.post, {
    //         onDelete: "cascade"
    //     })
    // }

    return User;
}