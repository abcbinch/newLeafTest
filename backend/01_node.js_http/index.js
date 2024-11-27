const http = require("http"); //모듈 불러오기. 서버 구축에 필요.
const fs = require("fs"); //html 파일 읽을 때 필요한 모듈.

const server = http.createServer(function (request, response) {
  console.log(request);

  console.log("url: ", request.url);

  //response
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  //{ "content-type": "text/html; charset=utf-8" }
  //이게 있어야 글자가 안 깨진다.

  //   response.write("<p>응답1</p>");
  //   response.write("<p>응답2</p>");
  //   response.write("<p>응답3</p>");
  //   response.end("<h3>응답 종료</h3>");
  //이건 따로따로

  try {
    const data = fs.readFileSync("./index.html"); //일부러 x를 뺐다.
    response.writeHead(200, { "content-type: ": "text/html; charset=utf-8" });
    response.end(data);
    //html 파일 한 번에 읽어오기
    //try문에서 실행될 코드
  } catch (error) {
    //try문에서 어떤 에러가 발생되었는지 error 객체를 넘겨준다. 생략 가능.
    //try문에서 에러가 났을 때 실행될 코드
    console.log("에러 객체: ", error);

    response.writeHead(404, { "content-type: ": "text/html; charset=utf-8" });
    //404.html
    //파일 이름 읽을 때 오타가 나면 404 페이지 보여주기
    // response.end("<h1>page not found</h1>");
    const four = fs.readFileSync("./404_error.html");
    response.end(four);
  }
}); //왜 안 되지 왜 에러 페이지가 안 뜨지.

const PORT = 8081; //이미 쓰고 있는 게 아니라면 아무 숫자나 괜찮음
server.on("connection", function (request, response) {
  console.log("connection 이벤트 발생");
}); //새로운 클라이언트가 나왔을 때만 발생.
server.on("request", function (request, response) {
  console.log("request 이벤트 발생");
});
server.listen(PORT, function () {
  console.log(`server listening on ${PORT}`);
});
