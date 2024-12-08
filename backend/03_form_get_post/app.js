const express = require("express");
const app = express();
const PORT = 8087;

//ejs views 미들웨어 설정하기
app.set("view engine", "ejs"); //템플릿 엔진. 뷰 엔진을 ejs로 설정하겠다.
app.set("views", "./views"); //뷰 파일들을 views라는 폴더에 전부 넣겠다.

//정적 파일 관리
// app.use("/static", __dirname + "/public"); //public이라는 폴더 안에 정적인 파일들(/static)을 전부 넣겠다.

//body-parser(미들웨어의 일종) 설정
//body를 읽을 수 있게 해 준다. 이게 없으면 req.body를 읽으려 해도 undefined만 뜬다.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//요청 > 응답
//req와 res는 순서를 바꾸면 안된다.
app.get("/", function (req, res) {
  // console.log("nodemon 실행");
  res.render("index");
}); //확장자 생략 가능.
//기본 페이지(/)로 들어갔을 때, response로 index.ejs를 보여주겠다.

//form을 get요청으로 보내기
app.get("/getForm", function (req, res) {
  console.log(req.query);
  res.render("result", {
    title: "GET",
    userInfo: req.query,
  });
  //   res.send("form data <b>GET</b> 요청 성공");
});
//result.ejs 파일을 렌더링해서 보여주겠다.
//객체에 title이라는 키를 만들고, 값은 'GET'으로 둔다.
//이러면 ejs 문법을 이용해서 제목만 쉽게 바꿀 수 있다.

//form을 post요청으로 보내기
app.post("/postForm", function (req, res) {
  console.log(req.body);
  res.render("result", {
    title: "POST",
    userInfo: req.body,
  });
  console.log(req.body.agree[0] === "marketing");
  //   res.send("form data <b>POST</b> 요청 성공");
});
//render 사용할 거라면 send는 지우거나 주석처리 해야 한다.
//그리고 이건 실습이라 둘 다 만들었지만,
//post와 get 둘 중 하나만 남겨놔야 한다.
//둘 다 써도 일단 응답은 되지만,
//콘솔 창에 오류코드가 나온다.

//이게 맞나?
app.post("/js-form-check", function (req, res) {
  res.send("yes");
});

app.listen(PORT, function () {
  console.log(`http://localhost:${PORT}`);
});

//==================================================================================================

//실습
//1./practice1에 대한 get 요청
app.get("/practice1", (req, res) => {
  res.render("1120실습용/practice1", {
    memInfo: req.query,
    addInfo: true,
  });
  console.log(req.query);
});

//2./practice2에 대한 get 요청
app.post("/practice2", (req, res) => {
  res.render("1120실습용/practice2", {
    memInfo2: req.body,
  });
});

//3.주소 지정 form GET 요청

//4.주소 지정 form POST 요청
