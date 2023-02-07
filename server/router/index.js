const { Router } = require("express");
const userRouter = require('./userRouter');
const leadersRouter = require('./leadersRouter');

const router = new Router();

router.use('/users', userRouter);

router.use('/game/:id', leadersRouter);

module.exports = router;