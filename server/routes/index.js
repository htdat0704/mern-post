const authRoute = require('./auth');
const postRoute = require('./post');
const commentRoute = require('./comment');


function route(app) {
    app.use('/comment',commentRoute)
    app.use('/post',postRoute)
    app.use('/auth',authRoute)
}

module.exports = route