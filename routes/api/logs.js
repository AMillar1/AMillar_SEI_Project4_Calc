const express = require('express');
const router = express.Router();
const logsCtrl = require('../../controllers/api/logs');

router.post('/', logsCtrl.create); // POST/api/logs

router.get('/', logsCtrl.getAll);

module.exports = router;