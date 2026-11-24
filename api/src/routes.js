const router = require('express').Router();

const HealthController = require('./controllers/HealthController');

router.get('/health-check', HealthController.healthCheck);

module.exports = router;