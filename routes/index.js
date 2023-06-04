const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.use('/', require('./swagger'), require('./auth'));
router.use('/settings', auth, require('./settings'));

module.exports = router;