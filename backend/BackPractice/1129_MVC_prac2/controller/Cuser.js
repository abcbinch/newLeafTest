const dataPack = require("../model/User");

exports.main = (req, res) => {
  res.render("main");
};

exports.users = (req, res) => {
  // let [apple, banana, cocoa] = dataPack.user.split("\n");
  const userData = dataPack.user.split("\n");
  //분류기준은 apple, banana, cocoa가 아니라,
  //아이디, 패스워드, 닉네임이다.
  //apple = [apple, 1234, 사과사과]
  //banana = [banana, 4321, 바나나나나]
  //cocoa = [cocoa, qwer1234, 미떼]

  // const { userId, userPw, userNic } = req.body;
  const userIds = [];
  const users = [];
  userData.forEach((comp) => {
    const userInfoArr = comp.split("//");
    const userObj = {
      realId: userInfoArr[0],
      realPw: userInfoArr[1],
      realNic: userInfoArr[2],
    };
    users.push(userObj);
    userIds.push(userInfoArr[0]); //왜 userObj.realId는 안 되지?
    //아직 다 들어간 게 아니라서?
  });

  const idx = userIds.indexOf(req.body.userId);
  //내가 입력한 아이디가
  //배열 안에 있는지 확인

  console.log(userIds); //유저 아이디
  console.log(users); //유저 정보

  if (idx >= 0) {
    console.log(req.body.userId); //내가 입력한 아이디

    if (req.body.userPw === users[idx].realPw) {
      console.log(idx);
      res.send({ userNic: users[idx].realNic, isSuccess: true });
    } else {
      res.send({ isSuccess: false });
    }
  } else if (idx < 0) {
    console.log(idx);
    console.log(req.body.userId);
    res.send({ isSuccess: false });
  }
};
