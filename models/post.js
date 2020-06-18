module.exports = function(sequelize, dataTypes) {
    const Post = sequelize.define('Post', {
        body: {
            type: dataTypes.STRING,
            validate: {
                len: [1, 150]
            }
        },
        authorId: {
            type: dataTypes.INTEGER
        },
        author: {
            type: dataTypes.STRING
        },
        squawkTime: {
            type: dataTypes.STRING
        }
    })

    return Post;
}