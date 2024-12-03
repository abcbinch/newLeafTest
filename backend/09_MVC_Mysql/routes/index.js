const express = require("express");
const router = express.Router();
const controller = require("../controller/Cvisitor");
//컨트롤러와 라우터 불러오기

router.get("/", controller.main);
router.get("/visitor", controller.getVisitors);

module.exports = router;
