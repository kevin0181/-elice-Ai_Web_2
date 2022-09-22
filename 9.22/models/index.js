//mongoose를 가져옴
const mongoose = require('mongoose');

//스키마를 가져옴 //폴더경로 board.js를 가져옴
const PostSchema = require('./schemas/board');

//스키마를 mongoose모델로 변경함
exports.Post = mongoose.model('Post', PostSchema); 