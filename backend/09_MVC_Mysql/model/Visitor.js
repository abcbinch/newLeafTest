// exports.getVisitors = () => {
//   return [
//     { id: 1, name: "charlotte", comment: "hi, I am charlotte!" },
//     { id: 2, name: "knight", comment: "this is lifeblood" },
//   ];
// };
//DB 연결 전.
// 다르게 말하면,
//객체나 배열에 담아 함수로 전달하는 거랑
//데이터베이스로 전달하는 거랑 비슷하다는 뜻이다.

const mysql = require("mysql");
//mysql의 createConnection 메소드 이용
//axios, ajax, fetch로 데이터 전송할 때랑 비슷한 느낌이다.
const conn = mysql.createConnection({
  host: "localhost", //db가 설치된 호스트 아이디
  user: "root",
  password: "0401",
  database: "newLeaf",
}); //DB 연결
//변수 conn에 담아놨다.
//옥수수

exports.getVisitors = (cb) => {
  //컨트롤러에서 전달이 되는 콜백 함수
  conn.query(`SELECT * FROM visitor`, (err, rows) => {
    //conn의 query 메소드
    //rows가 데이터를 의미. rows말고 다른 변수를 써도 된다.
    if (err) {
      throw err;
    }

    console.log("visitor 테이블 전부 조회", rows);

    cb(rows);
    //이 콜백함수는 데이터베이스의 데이터를
    //컨트롤러로 전달하는 역할을 맡고 있다.
    //이름은 꼭 cb가 아니어도 되고 마음대로 정해도 된다.
  }); //여기까지가 conn.query. 쿼리문, 콜백 함수가 들어간다.
};
