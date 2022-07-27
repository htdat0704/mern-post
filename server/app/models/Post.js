const moongose =require('mongoose');
const Schema = moongose.Schema;
const slug = require('mongoose-slug-generator');

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    status: {
        type: String,
        enum : ["FOOD AND DRINK", "TRAVEL", "CULTURE"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    slug: { type: String, slug: 'title', unique: true },
})


moongose.plugin(slug);
module.exports = moongose.model('posts',PostSchema)