const { Router } = require("express");
const userController = require("../controller/userController");
const categoryRouter = require('./categoryRouter');
const resultRouter = require('./resultRouter');

const router = new Router();

router.post('/registration', userController.registration);

router.post('/login', userController.login);

router.get('/auth', userController.check);

router.delete('/', userController.delete);

router.use('/categories', categoryRouter)

router.use('/results', resultRouter)

module.exports = router;