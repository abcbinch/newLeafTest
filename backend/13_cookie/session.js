const express = require("express");
const session = require("express-session");
const app = express();
const port = 8082;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    secret: "password",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    },
  })
);
/* 
session({
    secret: "password", //필수값. 빼먹으면 안 된다. .env 관리 권장.
    resave: 세션에 수정사항이 생기지 않더라도, 요청받을 때마다 세션을 다시 저장할지를 결정.
    false가 권장된다.
    saveUninitialized: 세션에 값이 없더라도 세션을 처음부터 생성할지.
    boolean 값을 사용하며, false가 권장된다.
    cookie: {} cookie.js의 config 참고
    secure: true일 때느 https에섬나 세션을 주고받는다.
    name: 세션 쿠키의 이름.
  })
*/

app.get("/", (req, res) => {
  res.render("session");
});
//세션 설정
app.get("/set", (req, res) => {
  //req.session.키이름 = 값
  req.session.name = "sally";
  res.send("세션 설정 완료!");
});
//세션 확인
app.get("/get", (req, res) => {
  console.log("req.session 확인");
  console.log(req.session);
  console.log(req.sessionID);
  res.send({ id: req.sessionID, name: req.session.name });
});
//세션 삭제
app.get("/destroy", (req, res) => {
  console.log("res.session 확인");
  console.log(res.session);
  req.session.destroy((err) => {
    if (err) throw err;

    res.send("세션 삭제 완료");
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
