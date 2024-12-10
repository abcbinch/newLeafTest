const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 8081;

app.set("view engine", "ejs");
app.use(cookieParser()); // 쿠키 미들웨어 설정

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const popup = req.cookies.popup || "";
  res.render("index", { popup });
});

app.post("/set-cookie", (req, res) => {
  res.cookie("popup", "hide", { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
  res.send("쿠키 생성 성공!");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
