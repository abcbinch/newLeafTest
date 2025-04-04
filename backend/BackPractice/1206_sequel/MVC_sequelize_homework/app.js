const express = require("express");
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/static", express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO: 라우팅 분리
// 기본 주소: localhost:PORT/user <- 주의!!
const userRouter = require("./routes/user");
app.use("/user", userRouter);

// TODO: 404 에러 처리
app.get("*", (req, res) => {
  res.render("404");
});

//DB 연결
const db = require("./models"); //이것도 index는 생략 가능
db.sequelize.sync({ force: false }).then(() => {
  console.log("DB 연결 성공");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/user`);
});
