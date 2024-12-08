const express = require("express");
const controller = require("../controller/Cuser");
const router = express.Router();

router.get("/", controller.main);
router.post("/login", controller.login);

module.exports = router;
