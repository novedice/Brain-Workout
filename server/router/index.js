const { Router } = require("express");

const router = new Router();

router.get('/', (req, res) => {
  res.json(req.cookies.auth);
});

module.exports = router;