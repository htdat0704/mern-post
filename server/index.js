const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const cors = require('cors')
const db = require('./config/db');
const morgan = require('morgan');
// connect routes index.js
const route = require('./routes');
// delete soft
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
//sesssion
var session = require('express-session');
// app.set('trust proxy', 0) // trust first proxy

app.use(methodOverride('_method'));

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            // maxAge: 30000000
        },
    }),
);

//connect DB
db.connect();

// res.body
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(cors())

const PORT = 5000;

route(app);
app.listen(PORT, () => console.log(`SERVER start on PORT ${PORT}`));
