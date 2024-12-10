const express = require("express");
const session = require("express-session");
const app = express();
const port = 8083;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/static", express.static(__dirname + "/static"));

//세션 설정
app.use(
  session({
    secret: "cocoa",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    },
  })
);
//10분 뒤에 세션이 종료되도록

//로그인에 성공했다면 세션이 생성되어 저장되어 있을 것.
app.get("/", (req, res) => {
  //로그인이 안 된 유저라면 isLogin을 false로 저장
  //로그인이 된 유저라면 isLogin을 true로 저장하고 user를 user의 이름으로 저장
  if (true) {
    res.render("index", { isLogin: true });
  } else {
    res.render("index", { isLogin: false });
  }
});
app.get("/login", (req, res) => {
  res.render("login");
});

const userInfo = {
  userId: "cocoa",
  userPw: "1234",
};

//POST /login
//로그인 실행
//세션 저장
app.post("/login", (req, res) => {
  console.log(req.body);

  //실제 로그인 진행
  //세션 연결
  // res.session.userid = req.body.id;
  //세션의 user라는 키를 추가하여 userid 값을 value로 전달
  console.log(res.session);
  /*cocoa와 1234를 입력했더니 
  {id:'cocoa', pw: '1234'} 
  이렇게 나왔다.*/
  //입력한 정보가 userinfo의 정보와 같으면 실행
  if (req.body.id === userInfo.userId && req.body.pw === userInfo.userPw) {
    res.session.userid = req.body.id;
    res.session.userpw = req.body.pw;
    res.session.isLogin = true;
    res.send({ sesPack: res.session });
  } else {
    res.send("로그인 실패");
  }
});
//GET /logout
app.get("/logout", (req, res) => {
  //실제 로그아웃 진행
  //세션 삭제
});
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
