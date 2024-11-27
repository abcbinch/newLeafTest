const express = require("express");
const multer = require("multer");
const path = require("path"); //기본 내장 모듈. 안 깔아도 된다.
const app = express();
const room = multer({
  dest: "uploads/",
}); //변수명은 upload로 설정하는 게 관례인 듯
//어느 폴더에 올릴 것인지에 대한 설정
//설정만 해도 폴더가 저절로 생긴다.

//파일 확장자 설정
const uploadDetail = multer({
  storage: multer.diskStorage({
    //세 번째 인자는 콜백 함수.
    destination: (req, file, cb) => {
      cb(null, "uploads/"); //어디에 저장될지 설정한다(경로 설정)
    }, //uploads라는 폴더가 존재해야만 오류가 안 난다.
    //콜백함수 이름은 보통 done이라고 짓는다.
    filename: (req, file, done) => {
      const extension = path.extname(file.originalname);
      //path.extname(파일 이름.확장자) => 확장자만 리턴
      done(
        null,
        path.basename(file.originalname, extension) + Date.now() + extension
      );
      // path.basename(파일이름.확장자, 확장자) => 파일 이름만 리턴한다. extname과 반대
      //date를 붙여준 건 날짜 별로 구분하기 위해서?

      console.log(
        "path.basename: ",
        path.basename(file.originalname, extension)
      );
      console.log("path.extname: ", path.extname(file.originalname));
    },
  }),

  limits: { fileldSize: 5 * 1024 * 1024 }, //5MB 라는 뜻이다.
});
const port = 8083;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/statics", express.static(__dirname + "/public"));
app.use("/uploaded", express.static(__dirname + "/uploads"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//use는 express 내장 메소드를 인자로 사용할 경우 쓴다.
//set은 설정할 때

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", uploadDetail.single("userfile"), (req, res) => {
  //room 또는 uploadDetail
  console.log(req.body); //single이 userfile로 업로드한 파일을 uploads라는 폴더에 올린다.
  console.log(req.file); //여러 개일 때는 files
  res.send("응답");
});

/*
req.file의 내용

fieldname: 'userfile', 폼 내부에 정의한 name 값이다
originalname: '와인잔 강아지.jpg', 원본 파일명
encoding: '7bit' 아마도?, 파일 인코딩 타입
mimetype: 'image/jpg', 파일 타입
destination: 'uploads', 파일 저장 경로
filename: , 저장된 파일명
path: 'uploads\\(filename)',
size: ,파일 크기
*/

//하나의 input에 여러 개의 파일을 삽입할 수 있다.
app.post("/uploads/array", uploadDetail.array("multifiles"), (req, res) => {
  // console.log(req.file);
  console.log(req.files); //파일이 여러 개일 때는 이걸 써야 한다.
  console.log(req.body);
  res.send("업로드 완료");
});

//여러 개의 input에 파일 업로드하기
//fields 메소드 사용
//매개변수가 배열이다. {name: 'name값'}
app.post(
  "/uploads/fields",
  uploadDetail.fields([
    { name: "file1" },
    { name: "file2" },
    { name: "file3" },
  ]),
  (req, res) => {
    console.log(req.files);
    console.log(req.body);
    /*
    req.files의 내용 중 하나
    file1: [ //이건 내가 지정한 name
    {
      fieldname: 'file1',
      originalname: 'hollowknight.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: 'uploads/',
      filename: 'hollowknight1732518935854.jpg',
      path: 'uploads\\hollowknight1732518935854.jpg',
      size: 182271
    }
  ]
    */
    res.send("<b>field로 업로드 완료</b>");
  }
);

//동적 폼 파일 업로드
//그 자리에서 파일이 바뀐다. 파일'만' 바뀐다.
//그냥 비동기 생각하자. 페이지 전체가 아니라 일부만 바뀌는 것
app.post("/dynamicUpload", (req, res) => {
  console.log(req.file);
  console.log(req.body);
  // res.send(req.file);
  // res.send({...req.body, ...req.file});
  res.send({ fileInfo: req.file, body: req.body });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
