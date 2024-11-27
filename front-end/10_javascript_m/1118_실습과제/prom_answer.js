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
//reject 생략 가능
// function hellPromise() {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve("callback hell");
//     }, 1000);
//   });
// }

const hellPromise = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve("callback hell");
  }, 1000);
}); //이렇게 바꿔도 똑같이 작동한다.

//호출
callPromise("kim")
  .then((result) => {
    //kim, kim 반가워 가 동시에 뜬다.
    console.log(result + ", 반가워");
    return backPromise();
  })
  .then((txt) => {
    //back, back을 실행했구나 가 동시에 뜬다.
    console.log(txt + "를 실행했구나.");
    // return hellPromise();
    return hellPromise;
  })
  .then((msg) => console.log("여기는 " + msg));

//1. callPromise 호출
//2. then 호출
//3. return된 backPromise 호출
//4. then 호출

//2번 단계에 backPromise랑 콘솔을 다 적으면 오류가 난다.
//3번 단계에서 backPromise를 작성할 때 return을 안 시키고 then에 콘솔로그만 적으면 txt가 나와야 할 자리가
//undefined가 나온다.
