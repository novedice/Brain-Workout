const { Router } = require("express");
const categoryController = require("../controller/categoryController");

const router = new Router();

router.post('/', categoryController.create);

router.get('/', categoryController.get);

router.delete('/', categoryController.delete);

module.exports = router;