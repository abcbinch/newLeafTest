const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8081;

app.set("view engine", "ejs");
app.set("views", "./views");

//TODO 쿠키 미들웨어
app.use(cookieParser());

const cookieConfig = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  // secure: false,
};

//쿠키 전송하기
app.get("/", (req, res) => {
  //TODO:쿠키값 가져오기 및 index.ejs에 보내기
  //res.render("index", { popup: 쿠키값 });
  console.log(req.cookies);
  // console.log(JSON.stringify(req.cookies));
  // res.render("index", { popup: JSON.stringify(req.cookies) });
  res.render("index", { popup: req.cookies.hideModal });
});

//TODO: 쿠키 생성하기
//오늘 그만 보기를 눌렀을 때 생성되게 하면 되려나?
app.post("/set-cookie", (req, res) => {
  res.cookie("hideModal", "hideit", cookieConfig);

  res.send({
    popup: req.cookies,
    isCookie: true,
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
