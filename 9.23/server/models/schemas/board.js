// mongoose에서 스키마를 정의하기위해 스키마를 가져오는 부분
const { Schema } = require('mongoose');

const PostSchema = new Schema({
    title: String,
    content: String,
}, {
    timestamps: true,
});

module.exports = PostSchema;