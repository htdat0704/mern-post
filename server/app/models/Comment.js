const moongose =require('mongoose');
const Schema = moongose.Schema;

const Comment = new Schema({
    body: {
        type: String,
        required: true
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = moongose.model('comments',Comment)