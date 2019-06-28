const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
config = require('./config/database');
passport = require('passport');
routes = require('./routes/routes');
bodyParser = require('body-parser');
const http = require('http');

var express = require('express');
var app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(routes);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.database);

mongoose.connection.on('open', function () {
    console.log('Mongo is connected');
    app.listen(3000, () => {
        console.log('chat running on http://localhost:3000');
    });
});



