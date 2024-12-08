// TODO: 컨트롤러 코드
const models = require("../models/index");

exports.main = (req, res) => {
  res.render("index");
};

exports.showSignup = (req, res) => {
  res.render("signup");
};
//회원 등록
//회원 가입 페이지에서 수행
exports.createMember = (req, res) => {
  // User.createMember(req.body);
  models.User.create({
    userid: req.body.userid,
    name: req.body.name,
    pw: req.body.pw,
  })
    .then(() => {
      res.send({ isSuccess: true });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.showSignin = (req, res) => {
  res.render("signin");
};
//로그인 유효성 체크
//로그인 페이지에서 수행
exports.getMember = (req, res) => {
  models.User.findOne({
    where: {
      userid: req.body.userid,
      pw: req.body.pw,
    },
  }).then((result) => {
    // res.send({ pack: result });

    if (result === null) {
      res.send({ isSuccess: false });
    } else if (result !== null) {
      res.send({ pack: result, isSuccess: true });
    }
  });
};
//프로필 페이지에 회원정보 표시
exports.showMemberInfo = async (req, res) => {
  try {
    const result = await models.User.findOne({
      where: {
        userid: req.body.userid,
      },
    });

    res.render("profile", {
      data: result,
    });
  } catch (err) {
    alert(err);
  }
  //async await을 안 사용하고 쓰던대로 쓰면
  //로그인 페이지에서 프로필 페이지로 넘어갈 때
  //무한루프가 걸린다.
  //try catch는 안 써도 일단 문제는 없었지만,
  //혹시 몰라서 그냥 넣어줌

  //일반적인 방식으로 쓴 것.
  //이렇게 쓰면 무한 루프 걸린다.
  // models.User.findOne({
  //   where: req.body.userid,
  // })
  //   .then((result) => {
  //     res.render("profile", {
  //       data: result,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
//회원 정보 수정
exports.updateInfo = (req, res) => {
  models.User.update(
    {
      userid: req.body.userid,
      name: req.body.name,
      pw: req.body.pw,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  ).then(() => {
    res.send({ isSuccess: true });
  });
};
//회원 탈퇴
//회원 정보 페이지에서 수행
exports.deleteMember = async (req, res) => {
  try {
    const result = await models.User.destroy({
      where: {
        id: req.body.id,
        userid: req.body.userid,
      },
    });

    res.send({ isDelete: true });
  } catch (err) {
    console.log(err);
  }
  //async await 필수
  //무한루프 걸리지는 않는데,
  //삭제가 빨리 이루어지지 않는다.
  //두 번 지워야 한다.

  // models.User.destroy({
  //   where: {
  //     id: req.body.id,
  //     userid: req.body.userid,
  //   },
  // }).then(() => {
  //   res.send({ isDelete: true });
  // });
};
