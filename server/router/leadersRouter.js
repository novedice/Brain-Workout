const { Router } = require("express");
const leaderController = require("../controller/leaderController");

const router = new Router();

router.get('/:id/leaders', leaderController.get);

module.exports = router;