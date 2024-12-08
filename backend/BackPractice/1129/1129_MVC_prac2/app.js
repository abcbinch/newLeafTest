const express = require("express");
const app = express();
const port = 8083;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.render("index");
// });
//일단 기본 방식대로 적은 다음 model, routes, controller로
//분해할 생각이다.
//MVC 패턴대로 적을 때는 get이 아니라 use를 사용한다는 점
//명심해두자.
const indexRouter = require("./routes/main"); //main, index는 생략 가능
app.use("/", indexRouter);

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
