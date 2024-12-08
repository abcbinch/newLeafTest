// TODO: 라우트 설정
const express = require("express");
const router = express.Router();
const controller = require("../controller/Cuser");

router.get("/", controller.main);
router.get("/signup", controller.showSignup);
router.post("/signup", controller.createMember);
router.get("/signin", controller.showSignin);
router.post("/signin", controller.getMember);
router.post("/profile", controller.showMemberInfo);
router.patch("/profile/edit", controller.updateInfo);

router.delete("/profile/delete", controller.deleteMember);

module.exports = router;
