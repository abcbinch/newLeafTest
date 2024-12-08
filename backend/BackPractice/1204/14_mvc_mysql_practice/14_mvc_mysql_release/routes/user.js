// TODO: 라우트 설정
const express = require("express");
const router = express.Router();
const controller = require("../controller/Cuser");

router.get("/", controller.main);
router.get("/signup", controller.showSignup);
router.post("/signup", controller.createMember);
router.get("/signin", controller.showSignin);
router.post("/signin", controller.getMember);
// router.get("/profile", controller.showUpdate);
router.post("/profile", controller.showMemberInfo);
//get으로 페이지 렌더링
//post로 데이터 연결?
//profile/:id로 해서
//id에 회원 id가 이미 기록된 상태로
// router.post("/profile", controller.showUpdate);
//이유는 모르겠는데 post로 작성하면 이동이 안 된다.
router.patch("/profile/edit", controller.updateInfo);
router.delete("/profile/delete", controller.deleteMember);

module.exports = router;
