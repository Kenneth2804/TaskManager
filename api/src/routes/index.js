const { Router } = require('express');
const taskRoutes = require('./tasks.js');

const router = Router();

router.use('/api/tasks', taskRoutes);

module.exports = router;
