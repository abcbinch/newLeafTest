const express = require("express");
const controller = require("../controller/Cmain"); //controller 폴더 안의 cmain을 가지고 온다.
const router = express.Router();

router.get("/", controller.main);
//'/'로 들어가면, controller로 가서
//main 함수를 실행해라

router.get("/comments", controller.comments);

router.get("/commentDetail/:id", controller.commentDetail);

module.exports = router;
