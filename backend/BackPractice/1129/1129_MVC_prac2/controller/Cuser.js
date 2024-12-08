const dataPack = require("../model/User");

exports.main = (req, res) => {
  res.render("main");
};

exports.users = (req, res) => {
  // let [apple, banana, cocoa] = dataPack.user.split("\n");
  const userData = dataPack.user.split("\n");
  //['apple//1234//사과사과',
  //'banana//4321//바나나나나',
  //'cocoa//qwer1234//미떼']

  // const { userId, userPw, userNic } = req.body;
  const userIds = [];
  const users = [];
  userData.forEach((comp) => {
    const userInfoArr = comp.split("//");
    const userObj = {
      realId: userInfoArr[0], //['apple','banana','cocoa']
      realPw: userInfoArr[1], //['1234','4321','qwer1234']
      realNic: userInfoArr[2], //['사과사과','바나나나나','미떼']
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
    //idx가 0 이상이다 == 내가 입력한 것이 realId이다.
    if (req.body.userPw === users[idx].realPw) {
      //users에는 회원정보가 객체 형식으로 배열 안에 순서대로 들어있다.
      //users의 순서와 userIds의 순서는 apple, banana, cocoa로 동일.
      //그래서 users[idx].realPw는 내가 입력한 realId의 패스워드와 동일
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
