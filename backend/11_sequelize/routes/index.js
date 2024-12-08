const express = require("express");
const router = express.Router();
const controller = require("../controller/Cvisitor");
//컨트롤러와 라우터 불러오기

router.get("/", controller.main);
router.get("/visitor", controller.getVisitors);
router.get("/visitor/:id", controller.seeSomeVisitors);
router.post("/visitor", controller.writeData);
router.delete("/visitor", controller.eraseVisitor);
router.patch("/visitor", controller.changeVisitor);

module.exports = router;
