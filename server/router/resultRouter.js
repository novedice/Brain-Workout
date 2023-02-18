const { Router } = require("express");
const resultController = require("../controller/resultController");

const router = new Router();

router.post('/', resultController.create);

router.get('/', resultController.get);

router.get('/best', resultController.get);

module.exports = router;