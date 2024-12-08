// TODO: 컨트롤러 코드
const User = require("../model/User");

exports.main = (req, res) => {
  res.render("index");
};

exports.showSignup = (req, res) => {
  res.render("signup");
};

exports.createMember = (req, res) => {
  User.createMember(req.body);
  res.render("signup");
};

exports.showSignin = (req, res) => {
  res.render("signin");
};

exports.getMember = (req, res) => {
  console.log("여기는 controller");
  console.log(req.body);
  User.getMember(req.body, (result) => {
    console.log("여기는 controller 안의 User.getMember");
    console.log(result);
    console.log(result.length);
    console.log(req.body);

    //아이디가 있는지 없는지만 판별
    //패스워드 일치여부는 axios에서
    if (result.length === 0) {
      res.send({
        isSuccess: false,
      });
    } else if (result.length > 0) {
      res.send({
        pack: result,
        isSuccess: true,
      });
    }
    //res.render 금지
  });
  //정확히는 아이디와 패스워드를 확인해서
  //로그인 성공 여부를 알려주는 코드
}; //일단 나중에 고치자.

exports.showUpdate = (req, res) => {
  // console.log("okay");
  // console.log("여기는 showUpdate. profile로 간다.");
  res.render("profile"); //주윤 님 하신대로
};

//함수 자체가 작동을 안 하고 있다.
exports.showMemberInfo = (req, res) => {
  // console.log("여기는 showMemberInfo. profile로 간다.");
  // console.log(req.body);

  User.showMemberInfo(req.body.userid, (result) => {
    // console.log("여기는 다시 controller내부의 model showMemberInfo");
    // console.log(result[0]);
    res.render("profile", { data: result[0] });
  });

  // res.render("profile", {
  //   data: req.body,
  // });
};

exports.updateInfo = (req, res) => {
  console.log(req.body);
  // console.log(req.query);
  // console.log(req.params);
  User.updateInfo(req.body, () => {
    console.log("여기는 model의 updateinfo 내부");
    console.log(req.body);
    res.send({ isSuccess: true });
  });
}; //데이터를 불러올 필요는 없어 보여서 일단 뺐다.
//원래는 로그인 정보를 기반으로 회원 정보를 가져와
//텍스트란에 채워야 하지만
//일단 생략했다.
//하지만 id 정보가 필요하기 때문에 반드시 손봐야 한다.
//입력한 정보(req.body)를
//model로 보내서 update 쿼리를 수행
//하지만 매개변수를 전달하지는 않고, 그냥 성공했다는 것만 전한다.
//성공했다면 res.send로 isSuccess를 true로 전달.

exports.deleteMember = (req, res) => {
  User.deleteMember(req.body, () => {
    console.log("여기는 delete controller 안의 model 함수");
    res.send({ isDelete: true });
  }); //req.body에 담기는 게 맞나?
};
