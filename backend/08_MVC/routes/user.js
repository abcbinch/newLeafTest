//router를 여러 개로 나누어 관리할 수 있다.

const express = require("express");
const router = express.Router();
const controller = require("../controller/Cuser");

router.get("/", controller.getUser); //괄호 붙이면 안 된다.
//여기서는 '/'가 조금 다른 의미를 지닌다.
// '/user'가 들어간 주소로 들어가면, 여기서 처리하겠다는 뜻
// router.get("/aa", controller.a);

//Post /user/login
// router.post("/login", controller.login);
// '/user/login'으로 들어간다는 뜻
// 앞의 '/user'가 생략됐다고 보면 된다.

module.exports = router;
