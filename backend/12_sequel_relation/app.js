const express = require("express");
const forRouting = require("./routes");
require("dotenv").config();
const { sequelize } = require("./models");
//모듈 안에는 sequelize라는 키와 Sequelize라는 키가 들어있는 객체
//그래서 객체 구조분해할당을 사용할 수 있다.
const app = express();
const port = 8086;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", forRouting);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB 연결 성공!!");
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("DB 연결 에러!!!");
    console.log(err);
  });
