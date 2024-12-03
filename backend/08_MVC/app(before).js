const express = require("express");
const app = express();
const port = 8088;

app.set("view engine", "ejs");
app.set("views", "./views");

// app.use("/static", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//가짜 데이터베이스
const fakeDB = [
  {
    id: 1,
    userid: "apple",
    date: "2024-10-23",
    comment: "hello",
  },
  {
    id: 2,
    userid: "banana",
    date: "2024-10-24",
    comment: "banana juice!",
  },
  {
    id: 3,
    userid: "lemon",
    date: "2024-10-25",
    comment: "lemoncake is sad",
  },
  {
    id: 4,
    userid: "peach",
    date: "2024-10-26",
    comment: "peach princess",
  },
];
//데이터 베이스 끝

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/comments", (req, res) => {
  res.render("comments", {
    commentInfo: fakeDB,
  });
});

app.get("/commentDetail/:id", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  //   res.send("응답 완료");
  const commentId = req.params.id;
  console.log("commentId는 " + commentId);
  console.log(fakeDB[commentId - 1]);
  if (commentId < 1 || commentId > fakeDB.length) {
    res.render("404");
  }

  if (isNaN(commentId)) {
    res.render("404");
  }
  res.render("commentDetail", { commentInfo: fakeDB[commentId - 1] });
});

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
