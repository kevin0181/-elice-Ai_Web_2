const { Post } = require("./../models");

exports.create = async () => {
    await Post.create({
        title: 'second title',
        content: 'second content'
    })
}
