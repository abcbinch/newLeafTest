function call(name, cb) {
  setTimeout(function () {
    console.log(name);
    cb(name);
  }, 1000);
}

function back(cb) {
  setTimeout(function () {
    console.log("back");
    cb("back");
  }, 1000);
}

function hell(cb) {
  setTimeout(function () {
    cb("callback hell");
  }, 1000);
}

//콜백함수 실행
//함수 안에 함수 안에 함수
//call 안에 넣은 콜백 함수 안에 콘솔 로그와 back 함수가 들어있다.
//back 안에 넣은 콜백 함수 안에 콘솔 로그와 hell 함수가 들어있다.
//hell 안에 넣은 콜백 함수 안에 콘솔 로그가 들어있다.
//call이라는 함수 하나만 선언했는데 9줄.
call("kim", function (name) {
  console.log(name + ", 반가워");
  back(function (txt) {
    console.log(txt + "를 실행했구나.");
    hell(function (msg) {
      console.log("여기는 " + msg);
    });
  });
});
