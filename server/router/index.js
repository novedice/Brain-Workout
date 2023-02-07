const { Router } = require("express");
const userRouter = require('./userRouter');
const leadersRouter = require('./leadersRouter');
const authMiddleware = require("../middleware/authMiddleware");

const router = new Router();

router.use('/users', userRouter);

router.use('/game/:id', authMiddleware, leadersRouter);

module.exports = router;