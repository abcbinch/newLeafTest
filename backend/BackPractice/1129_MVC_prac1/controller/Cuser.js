const User = require("../model/User");

// GET '/'
exports.main = (req, res) => {
  res.render("index");
};

// POST '/login'
exports.login = (req, res) => {
  // console.log(req.body);
  // { userId: 'ddd', userPw: 'ddd' }
  // console.log("model>>> ", User.getUserInfo());
  // { realId: 'banana', realPw: '1234' }

  // 객체 구조 분해 추가
  const { realId, realPw } = User.getUserInfo(); //{ realId: 'banana', realPw: '1234' }
  //model에서 가져온 데이터를 담았다.
  const { userId, userPw } = req.body;
  //index.ejs에서 axios로 받아온 데이터를 담았다.
  if (realId === userId && realPw === userPw) {
    res.send({ userInfo: req.body, isSuccess: true });
  } else {
    res.send({ isSuccess: false });
  }
};
