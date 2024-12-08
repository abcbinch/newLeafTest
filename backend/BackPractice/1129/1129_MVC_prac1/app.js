const express = require("express");
const app = express();
const PORT = 8086;

// 미들웨어 설정
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 라우터 불러오기
// const indexRouter = require("./routes/index");
const indexRouter = require("./routes");
app.use("/", indexRouter);

// 404 설정
app.get("*", (req, res) => {
  res.send("<h2>Page Not Found</h2>");
});

// listen
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
