const express = require("express");
const indexRouter = require("./routes/index");
const db = require("./models"); //index는 생략 가능
const app = express();
// const port = 8087;
require("dotenv").config();
const port = process.env.PORT;

app.set("view engine", "ejs");
// app.set("views", "./views");

app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);

// app.get("*", (req, res) => {
//   res.render("404");
// });

db.sequelize.sync({ force: false }).then((result) => {
  //true => 테이블 유무 상관없이 지우고 config.json의 정보를 기반으로
  //테이블을 다시 만든다
  //false => 테이블이 있다면 그걸 쓰고, 없다면 config.json의 정보를 기반으로
  //테이블을 만들어서 쓴다.
  // console.log(result);
  console.log("db 연결 성공");
});

//위에 console.log(result)의 결과가 매우 길다
//게다가 저게 console.log(`http://localhost:${port}`)보다 나중에 나와서
//주소란 찾아서 들어가기 힘들어진다.
//sync는 비동기 함수라서 then 안에 app.listen을 넣어서
//나중에 나오게 할 수도 있다.
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
