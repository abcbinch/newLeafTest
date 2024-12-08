const express = require("express");
const router = express.Router();
const controller = require("../controller/Cuser");

router.get("/", controller.main); //아직 안 만들었다.
router.post("/dataCheck", controller.users);

module.exports = router;
