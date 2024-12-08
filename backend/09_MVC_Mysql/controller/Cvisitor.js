const Visitor = require("../model/Visitor");
//모델에서 가져온 데이터

exports.main = (req, res) => {
  res.render("index");
};

exports.getVisitors = (req, res) => {
  // console.log(Visitor.getVisitors());
  // res.render("visitor", { data: Visitor.getVisitors() });
  //위는 DB 연결 전
  //아래는 DB 연결 후

  Visitor.getVisitors((result) => {
    console.log("전체 목록 Cvisitor.js", result);
    res.render("visitor", { data: result });
  });
  //간단히 말하면, result가 쿼리 실행 결과를 나타낸다.
  //이건 model에서 가져온 getVisitors고, 그 함수 안의 cb가 넘겨준 rows가
  //저 result 안에 들어있다.
  //저 안에 result를 매개로 삼고 있는 화살표 함수가 콜백 함수였다!
  //주석을 사이에 너무 많이 써놔서 헷갈렸다.
  //페이지를 렌더링하고 있지 않아서 문제가 생긴 거였다.
  //진짜 멍청하다.
};

//visitor.ejs 페이지를 보여준다
//모델에서 가져온 데이터(Visitor)에 있는 getVisitors 메소드를 실행하여
//data에 데이터를 담는다.

// /visitor/:id GET
exports.seeSomeVisitors = (req, res) => {
  console.log(req.params); //{ id: '1'} 이라고 뜬다.
  // res.send("response");
  Visitor.getSomeVisitor(req.params.id, (result) => {
    console.log("Cvisitor.js로 가져온 한 개의 데이터 : ", result);
    res.send(result);
    // res.render("/visitor/:id", {
    //   data: result,
    // });
  });
};

// visitor POST --- 등록
exports.writeData = (req, res) => {
  console.log(req.body);
  Visitor.insertData(req.body, (result) => {
    console.log("Cvisitor.js post 결과: ", result);
    res.send({
      id: result,
      comment: req.body.comment,
      name: req.body.name,
    });
  });
};

//visitor DELETE --- 삭제
//query, params, body 전부 된다.
exports.eraseVisitor = (req, res) => {
  // console.log(req.body); /// { id: '3'}
  // console.log(req.body.id); // 3
  Visitor.deleteVisitor(req.body.id, () => {
    res.send(req.body.id + "번 삭제 완료");
  }); //cb에서 전달해준 게 없기 때문에, 여기도 매개변수가 없다.
  // res.send("response!");
};

//visitor PATCH --- 수정
exports.changeVisitor = (req, res) => {
  // console.log(req.body); //바꿔야 하는 정보가 많아서 req.body를 사용
  // res.send("response patch!");
  Visitor.patchVisitor(req.body, () => {
    // res.send("수정 완료");
    res.send(req.body);
  });
};
