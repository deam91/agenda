var express = require('express');
var actions = require('../methods/actions');
var router = express.Router();

router.get('/start', actions.start);

module.exports = router;
