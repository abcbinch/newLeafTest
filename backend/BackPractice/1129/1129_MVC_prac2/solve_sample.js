// POST '/login2'
exports.login2 = (req, res) => {
  // console.log(User.user);
  /* 
    apple//1234//사과사과
    banana//4321//바나나나나
    cocoa//qwer1234//미떼
    */
  const users = []; // [{realId, realPw, name},..]
  const userIds = []; // ["apple","banana","cocoa"]
  const userData = User.user.split("\n");
  userData.forEach((user) => {
    // user='banana//4321//바나나나나'
    const userInfoArr = user.split("//"); //[banana, 4321, 바나나나나]
    const userObj = {
      realId: userInfoArr[0],
      realPw: userInfoArr[1],
      name: userInfoArr[2],
    };
    users.push(userObj);
    userIds.push(userInfoArr[0]);
  });
  // console.log("users", users);
  // console.log("userIds", userIds);
  // //// 요청 정보를 바탕으로 회원이 맞는지 확인
  const idx = userIds.indexOf(req.body.userId);
  // ["a", "b", "c"].indexOf("c"); // 2
  // ["a", "b", "c"].indexOf("d"); // -1
  // idx >=0 userIds에 있는 회원
  // idx가 -1이라면 userIds에 없는 회원

  if (idx >= 0) {
    console.log("아이디가 있는 회원");
    if (req.body.userPw === users[idx].realPw) {
      console.log("비밀번호 일치");
      res.send({ isSuccess: true, userName: users[idx].name });
    } else {
      console.log("비밀번호 불일치");
      res.send({ isSuccess: false });
    }
  } else {
    console.log("아이디가 없는 회원");
    res.send({ isSuccess: false });
  }
  // console.log(userData);
  // res.send("response!");
};
