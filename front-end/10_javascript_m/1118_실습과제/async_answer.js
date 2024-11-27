function callPromise(name) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log(name);

      resolve(name);
    }, 1000);
  });
}

function backPromise() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log("back");
      resolve("back");
    }, 1000);
  });
}

function hellPromise() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("callback hell");
    }, 1000);
  });
}

// //호출
// callPromise("kim")
//   .then((result) => {
//     console.log(result + ", 반가워");
//     return backPromise();
//   })
//   .then((txt) => {
//     console.log(txt + "를 실행했구나.");
//     return hellPromise();
//   })
//   .then((msg) => console.log("여기는 " + msg));

//async를 사용하기 위한 함수
async function execute() {
  const name = await callPromise("sally");
  console.log(name + " 반가워!");
  const back = await backPromise();
  console.log(back + "을 실행했구나.");
  const hell = await hellPromise();
  console.log("여기는 " + hell);
}

//name에는 callPromise의 결과로 반환된 값이 담겨있다.

execute();
//callPromise 실행
//성공
//name에 result를 담아 콘솔과 함께 나온다.
//backPromise 실행
//성공
//back에 result를 담아 콘솔과 함께 나온다.
//hellPromise 실행
//성공
//hell에 result를 담아 콘솔과 함께 나온다.
