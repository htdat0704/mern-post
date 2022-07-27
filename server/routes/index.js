const authRoute = require('./auth');
const postRoute = require('./post');


function route(app) {

    app.use('/post',postRoute)
    app.use('/auth',authRoute)
}

module.exports = route