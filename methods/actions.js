var config = require('../config/database');
var user = require('../model/user');
var mongoose = require('mongoose');
const Agenda = require('agenda');

var functions = {
    start: function (req, res) {
        const connectionOpts = {db: {address: 'mongodb://localhost:27017/schedule'}};
        const agenda = new Agenda(connectionOpts);
        agenda.processEvery('one minute');
    }
};
module.exports = functions;
