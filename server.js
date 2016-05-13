var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./routes/index.js');
var DB_CONNECTION_STRING = process.env.DB_STRING;
console.log(DB_CONNECTION_STRING);
mongoose.connect(DB_CONNECTION_STRING);
var BankModel = require('./models/bank.model');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(methodOverride());
app.use('/', routes);
// All other routes should redirect to the index.html
app.route('/*')
    .get(function (req, res) {
        res.sendfile(app.get('appPath') + '/index.html');
    });
app.listen(8080);
console.log("App listening on port 8080");