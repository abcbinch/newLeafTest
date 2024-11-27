const express = require("express");
const app = express();
const PORT = 8089;
const realId = "banana";
const realPswd = "1234";

app.set("view engine", "ejs");
app.set("views", "./views");
//body-parser!
//해석할 모듈 설정
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use("/static", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("maindoor");
});
//index를 쓰는 게 관례인 것 같긴 하지만
//index에만 익숙해지면 파일명 상관없이 index라고 쓰게 될 것 같아서
//일부러 파일명을 index 말고 다른 것으로 정했다.

//ajax get 요청
app.get("/ajaxGetTest", function (req, res) {
  console.log(req.query);
  res.send("get 응답!");
});
//url 부분에 직접 적어도 된다.
//  /ajaxGetTest?name=allie&gender=여성    이런 식으로
app.post("/ajaxPostTest", function (req, res) {
  console.log(req.body);
  res.send("post 응답!");
});

//axios get
app.get("/axiosGetTest", function (req, res) {
  console.log(req.query);
  res.send(req.query);
});

//axios post
app.post("/axiosPostTest", function (req, res) {
  console.log(req.body);
  res.send("응답 완료");
});

//fetch get
app.get("/fetchGetTest", (req, res) => {
  console.log(req.query);
  res.send("Hollow Knight");
}); //클라이언트에서 .text()를 사용해야 한다.

//fetch post
app.post("/fetchPostTest", (req, res) => {
  console.log(req.body);
  // res.send("Nine Sols");
});

//+외부 api 불러오기
app.get("/API", function (req, res) {
  res.render("api");
});
//실습 1. 밑에 이름과 취미 표시되게 하기
app.get("/practice01", (req, res) => {
  res.render("practice_1125/practice01");
});

app.get("/axios_get", (req, res) => {
  res.send(req.query);
});
//실습 2. post로 로그인 정보 보내기
app.get("/practice02", (req, res) => {
  res.render("practice_1125/practice02");
});

app.post("/axios_post", (req, res) => {
  console.log(req.body);

  if (realId === req.body.userId && realPswd === req.body.userPswd) {
    res.send({ isSuccess: true, userId: req.body.userId });
  } else {
    res.send({ isSuccess: false });
  }
  // res.send("응답 완료");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
