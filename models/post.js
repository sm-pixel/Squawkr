module.exports = function(sequelize, dataTypes) {
    const Post = sequelize.define('Post', {
        body: {
            type: dataTypes.STRING,
            validate: {
                len: [1, 150]
            }
        },
        likes: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        authorId: {
            type: dataTypes.INTEGER
        },
        author: {
            type: dataTypes.STRING
        },
        liked: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        }
    })

    return Post;
}