const express = require("express");
const multer = require("multer");

const path = require("path");
const app = express();
// const room = multer({
//   dest: "uploads/",
// });//roomCustom이 있기 때문에 필요 없다.
const port = 8088;
const roomCustom = multer({
  storage: multer.diskStorage({
    //저장위치 설정. dest에 대응됨.
    //그런데 저절로 만들어지지는 않고 내가 만들어야 한다.
    destination(req, file, done) {
      done(null, "uploads/");
      //null이 무슨 역할이지?
      //uploads라는 폴더가 이미 있어야 오류가 안 난다.
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); //확장자만 남긴다
      done(null, req.body.userId + Date.now() + ext);
      //파일을 이렇게 표시하겠다는 뜻
      //근데 진짜 null이 무슨 역할이지
    },
  }),
});

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/uploads", express.static(__dirname + "/uploads"));
//uploads는 위에서 dest로 만든 uploads 폴더를 가리키는 건가
//아니면 roomCustom에서 만든 uploads 폴더?
//저 폴더 안의 사진들을 불러올 수 있게 해주려는 건가?
app.use("/statics", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/userPage", roomCustom.single("prof"), (req, res) => {
  console.log("hey");
  console.log(req.body);
  //   {
  //     id: 'qqq123',
  //     pswd: '1234123refs',
  //     name: '정형석',
  //     age: '27'
  //   }
  console.log(req.file);
  //   {
  //     fieldname: 'prof',
  //     originalname: 'mangobanana.jpg',
  //     name: '정형석',
  //     age: '27'
  //   }
  res.render("userPage", {
    userInfo: req.body,
    profInfo: req.file,
  });
});
//왜 콘솔로그가 안 뜰까
//개발자툴 콘솔이 아니라 vscode 터미널에 뜬다. 자꾸 헷갈린다.

//왜 비밀번호랑 나이만 전송되고 나머지는 날아갔을까.
//req.body가 제대로 전달되고 있는 건가
//req.file도 이렇게 객체 형식으로 전달하는 게 맞는 건가
//저기 사진이 들어있기는 한가

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
