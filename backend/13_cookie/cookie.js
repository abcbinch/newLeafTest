const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8084;

//take1. 암호화되지 않은 쿠키
app.use(cookieParser());
//take2. 암호화된 쿠키
// app.use(cookieParser("password"));
//비밀 키는 .env에서 관리하는 게 좋다.
//비밀번호(문자열 부분)는 뭘로 정하든 상관없다.

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("cookie");
});

//cookie 설정객체. 7가지.
const cookieConfig = {
  //maxAge: 쿠키의 수명. 숫자단위. 밀리초 단위로 적는다.
  maxAge: 60 * 1000,
  //expires: 쿠키의 수명. 만료 날짜. GMT 시간을 설정한다. new Date(2024,11,9)
  //httpOnly: 프론트에서 document.cookie로 접속하는 것을 차단한다.
  //http 통신으로만 접근 가능하게 해놓는 것이다.
  httpOnly: true,
  //path: 어떤 경로에서 쿠키를 만들지를 정한다. 마음대로 정해도 된다.
  //secure: 웹 브라우저와 웹 서버가 https로 통신할 경우에만 쿠키를 전송하게 하는 것
  //boolean 값으로 정한다.
  //signed: 쿠키 암호화 여부를 결정한다. boolean 값으로 정한다.
  signed: false, //take1
  // signed: true, //take2
};
// const cookieConfig2 = {
//   maxAge: 10 * 60 * 1000,
//   httpOnly: true,
//   path: "/abc",
// };

//쿠키 가져오기
app.get("/getCookie", (req, res) => {
  console.log("여기는 get cookie. req.cookies의 값은 ");
  console.log(req.cookies);
  res.send(req.cookies);
  // console.log("암호화된 쿠키는 req.signedCookies에서!");
  // console.log(req.signedCookies);
});
//쿠키 설정
app.get("/setCookie", (req, res) => {
  res.cookie("chocochip", "tasty", cookieConfig);
  //쿠키이름, 쿠키값, 옵션을 각각 적어주면 된다.
  //이름과 값은 마음대로 정해서 쓰면 된다.
  //쿠키를 암호화 시키든 아니든 res.cookie를 쓰는 건 똑같다.
  res.send("set cookie 완료, 응답 종료!");
});
app.get("/clearCookie", (req, res) => {
  res.clearCookie("chocochip", "tasty", cookieConfig);
  res.send("cookie clear! 응답 종료!");
});

//2번째 쿠키설정값
// app.get("/abc", (req, res) => {
//   res.cookie("abc-page", "abc page cookie", cookieConfig2);
//   res.render("cookie-another");
// });
/* 
상위경로('/')에서 만든 쿠키는 하위 경로('/user','/admin' 등등)에서 
볼 수 있으나,
하위 경로에서 만든 쿠키는 상위 경로에서 볼 수 없다.
*/

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

/* 
take1. 암호화를 안 한 경우
-미들웨어 설정 >> app.use(cookieParser())
-쿠키설정 >> res.cookie('쿠키이름','쿠키값',{쿠키옵션})
-쿠키확인 >> req.cookies 객체에서 확인
-쿠키삭제 >> res.clearCookie()
-clearCookie(), cookie()는 응답완료를 하지 않는다. 마무리를 짓지 않는다?
render, send, redirect, end 등으로 응답완료 작업을 해야 한다.
마무리를 해 줘야 한다.
-삭제할 때는 이름, 값, 옵션이 정확히 일치해야 삭제된다.

take2. 암호화를 한 경우
-미들웨어 설정 >> app.use(cookieParser('임의의 문자열'))
-쿠키설정 >> 위와 동일
    단, signed가 true여야 한다.
-쿠키확인 >> req.signedCookies 객체에서 확인
-쿠키삭제 >> res.clearCookie()
-clearCookie(), cookie()는 응답완료를 하지 않는다. 마무리를 짓지 않는다?
render, send, redirect, end 등으로 응답완료 작업을 해야 한다.
마무리를 해 줘야 한다.
-삭제할 때는 이름, 값, 옵션이 정확히 일치해야 삭제된다.
*/
