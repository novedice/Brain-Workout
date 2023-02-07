const { Router } = require("express");
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const categoryRouter = require('./categoryRouter');
const resultRouter = require('./resultRouter');

const router = new Router();

router.post('/registration', userController.registration);

router.post('/login', userController.login);

router.get('/auth', authMiddleware, userController.check);

router.delete('/', authMiddleware, userController.delete);

router.use('/categories', authMiddleware, categoryRouter)

router.use('/results', authMiddleware, resultRouter)

module.exports = router;