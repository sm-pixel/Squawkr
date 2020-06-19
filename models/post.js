module.exports = function(sequelize, dataTypes) {
    //Create a Post table
    const Post = sequelize.define('Post', {
        //Holds the body of every post, string with length 1-150
        body: {
            type: dataTypes.STRING,
            validate: {
                len: [1, 150]
            }
        },
        //Id of the person who wrote it
        authorId: {
            type: dataTypes.INTEGER
        },
        //Name of the person who wrote it
        author: {
            type: dataTypes.STRING
        },
        //The time the post was made
        squawkTime: {
            type: dataTypes.STRING
        }
    })

    return Post;
}