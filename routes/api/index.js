const router = require('express').Router();
const userRoutes = require('../api/user-routes');
const thoughtRoutes = require('../api/thought-routes');
const reactionRoutes = require('../api/reaction-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/reactions', reactionRoutes);

module.exports = router;
