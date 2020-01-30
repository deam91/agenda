var config = require('../config/database');
var user = require('../model/user');
var mongoose = require('mongoose');
const Agenda = require('agenda');

var functions = {
    start: function (req, res) {
        const connectionOpts = {db: {address: 'mongodb://localhost:27017/schedule'}};
        const agenda = new Agenda(connectionOpts);
        agenda.define('save user', (job, done) => {
            const time = new Date();
            console.log(`\n#### ${time.toTimeString()}`);
            console.log("started...");
            let {domain} = job.attrs.data;
            let conn = mongoose.createConnection(config.database),
                User = conn.model('User', user);
            console.log("getting data...");
            User.find({"email": {$regex: `@${domain}`}}).then((data) => {
                data.forEach((elem, index) => {
                    console.log(`${elem.name} - ${elem.email}`);
                    console.log(`########`);
                });
            });
            done();
        });
        agenda.on('ready', () => {
            agenda.every('10 seconds', 'save user', {domain: 'asd.com'});
            agenda.start();
            agenda.now('save user', {domain: 'asd.com'});
            res.status(200).send("scheduled..");
        });
    }
};
module.exports = functions;
