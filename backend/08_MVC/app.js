const express = require("express");
const app = express();
const port = 8088;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//router 분리
const indexRouter = require("./routes/index"); //routes index에서 내보낸 모듈이 여기로
app.use("/", indexRouter);
// '/'로 들어왔을 때는 , indexRouter에 한 번 들어가봐라
const userRouter = require("./routes/user");
app.use("/user", userRouter);

//404
//반드시 마지막에 선언
//'저 위에 나온 그 어느 주소도 아니다'라는 의미로 '*'을 쓴 것.
//모든 것을 의미.
app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
