// const Visitor = require("../model/Visitor");
// const Visitor = require("../models/Visitor");
const models = require("../models/index");
const { errorlog } = require("../utils/common");
//모델에서 가져온 데이터

exports.main = (req, res) => {
  res.render("index");
};

exports.getVisitors = (req, res) => {
  //[sequelize 전]
  // Visitor.getVisitors((result) => {
  //   console.log("전체 목록 Cvisitor.js", result);
  //   res.render("visitor", { data: result });
  // });

  //[sequelize 후]
  //전체 조회 함수 작성
  models.Visitor.findAll() //아마 SELECT * FROM 을 수행하는 듯
    .then((result) => {
      console.log("findAll의 결과!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log(result); //배열 형태
      res.render("visitor", { data: result });
      // res.send(result);
    })
    .catch((err) => {
      console.log("getVisitors Controller err");
      console.log(err);
      console.log("컨트롤러로 가세요.");
      res.status(500).send("server error!");
    });

  // res.send("response");
};

//visitor.ejs 페이지를 보여준다
//모델에서 가져온 데이터(Visitor)에 있는 getVisitors 메소드를 실행하여
//data에 데이터를 담는다.

// /visitor/:id GET
exports.seeSomeVisitors = async (req, res) => {
  //[sequelize 이전]
  // Visitor.getSomeVisitor(req.params.id, (result) => {
  //   console.log("Cvisitor.js로 가져온 한 개의 데이터 : ", result);
  //   res.send(result);
  // });

  //[sequelize 이후]
  //SELECT * FROM visitor WHERE id=${req.params.id}
  //수정 버튼 누르면 작동
  try {
    const result = await models.Visitor.findOne({
      //맨 앞의 하나만 찾아온다
      //그래서 배열이 아닌 객체다.
      where: {
        id: req.params.id,
      },
    });
    //시간이 걸리는 작업이라서 await을 걸고 변수에 담아야 한다.
    console.log("findeOne 결과!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("INTERNAL SERVER ERROR!!");
  }
};

// visitor POST --- 등록
//INSERT INTO visitor VALUES 어쩌구 저쩌구
exports.writeData = (req, res) => {
  //[Sequelize 이전]
  // Visitor.insertData(req.body, (result) => {
  //   console.log("Cvisitor.js post 결과: ", result);
  //   res.send({
  //     id: result,
  //     comment: req.body.comment,
  //     name: req.body.name,
  //   });
  // });
  //
  //[Sequelize 이후]
  //왜 안되냐
  models.Visitor.create({
    name: req.body.name,
    comment: req.body.comment,
  })
    .then((result) => {
      console.log("create 결과!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("SERVER ERROR!!!");
    });
};

//visitor DELETE --- 삭제
//DELETE FROM visitor WHERE id=${id}
exports.eraseVisitor = async (req, res) => {
  //[Sequeilze 이전]
  // Visitor.deleteVisitor(req.body.id, () => {
  //   res.send(req.body.id + "번 삭제 완료");
  // });

  //[Sequeilze 이후]
  try {
    const result = await models.Visitor.destroy({
      where: { id: req.body.id },
    });
    console.log(result);
    if (Boolean(result)) {
      console.log("destroy 결과!!!!!!!!!!!!!!!!!!!!!");
      res.send(req.body.id + "번 아이디 삭제 완료");
    } else {
      res.send("<b>잘못된 접근입니다.</b>");
    }
  } catch (err) {
    console.log(err);
    res.send("INTERNAL SERVER ERROR!!!");
  }
};

//visitor PATCH --- 수정
exports.changeVisitor = async (req, res) => {
  // Visitor.patchVisitor(req.body, () => {
  //   res.send(req.body);
  // });

  //
  //처음부터 배열 구조분해할당을 쓰면
  //인덱스로 불러올 필요 없음.
  try {
    const [result] = await models.Visitor.update(
      {
        name: req.body.name,
        comment: req.body.comment,
      },
      {
        where: { id: req.body.id },
      }
    );

    console.log(result);
    //result 배열에 [1]이 들어온 건 수정이 성공한 경우
    //[0]이 들어온 경우는 수정이 실패한 경우
    // const boolNum = result[0];
    // const [boolNum2] = result[0];
    // console.log(boolNum);
    // console.log(boolNum2);
    if (Boolean(result)) {
      res.send("수정 완료");
    } else {
      res.send("잘못된 접근입니다.");
    }
  } catch (err) {
    errorlog(err, "patch controller 내부");
  }
};
