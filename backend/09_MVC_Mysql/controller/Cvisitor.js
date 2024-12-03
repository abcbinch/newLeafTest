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
    //이건 model에서 가져온 getVisitors.
    //controller의 getVisitors와는 다르다.
    //result는 model에서 getVisitors가
    //콜백함수를 통해 전달한 데이터
    console.log("전체 목록 Cvisitor.js", result);
    res.render("visitor", { data: result });
    //페이지를 렌더링하고 있지 않아서 문제가 생긴 거였다.
    //진짜 멍청하다.
  });
};

//visitor.ejs 페이지를 보여준다
//모델에서 가져온 데이터(Visitor)에 있는 getVisitors 메소드를 실행하여
//data에 데이터를 담는다.
