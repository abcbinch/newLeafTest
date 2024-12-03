const express = require("express");
const app = express();
const port = 8087;

app.set("view engine", "ejs");
// app.set("views", "./views");

app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const indexRouter = require("./routes/index");
app.use("/", indexRouter);
//get이 아니라 use를 써야 한다는 점도 중요한 차이점

// app.get("*", (req, res) => {
//   res.render("404");
// });

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
