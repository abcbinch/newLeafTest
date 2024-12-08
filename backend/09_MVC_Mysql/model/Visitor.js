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

//전체 목록을 조회하는 함수
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
    //Cvisitors의 Visitor.getVisitors 안에 매개변수로 들어있는 함수가
    //이 cb다.
    //이름은 꼭 cb가 아니어도 되고 마음대로 정해도 된다.
  }); //여기까지가 conn.query. 쿼리문, 콜백 함수가 들어간다.
};

//특정 데이터만 조회
exports.getSomeVisitor = (id, cb) => {
  //id는 정보를 조회하기 위한 조건. where 안에 들어가는
  conn.query(`SELECT * FROM visitor WHERE id=${id}`, (err, rows) => {
    if (err) {
      throw err;
    }

    console.log("visitor(model) 데이터 일부 조회: " + rows);
    cb(rows);
    //시간이 오래 걸리는 작업이라서 callback 함수가 필요하다.
  });
};

//등록하기 postVisitor(리더님)
exports.insertData = (data, cb) => {
  //data = req.body를 가리킨다. comment와 name이 들어있다.
  //id는 auto increment 덕분에 저절로 증가한다.
  //하지만 id 자리에 null을 적어줘야 한다.
  conn.query(
    `INSERT INTO visitor VALUES(null, '${data.name}', '${data.comment}')`,
    (err, rows) => {
      if (err) throw err;
      console.log("model post 결과: ", rows);
      cb(rows.insertId);
      //insertId가 뭐지?
      //rows 안에 원래 들어있다.
      //현재 넣은 id가 무엇인지 알려준다.
    }
  );
  //쿼리문을 쓸 때, 문자열 데이터를 넣을 때는
  //변수(${}로 쓰든, '++' 든)를 반드시 따옴표 안에 넣어야 한다.
};

//삭제하기
exports.deleteVisitor = (id, cb) => {
  conn.query(`DELETE FROM visitor WHERE id=${id}`, (err, rows) => {
    if (err) throw err;
    console.log("DELETE 결과");
    console.log(rows);
    console.log("결과 확인");
    cb();
  });
};

//수정하기
exports.patchVisitor = (data, cb) => {
  console.log("model의 데이터: ", data); //data === req.body
  conn.query(
    //큰 따옴표 작은 따옴표 상관없이, 문자열은 따옴표로 감싸줘야 한다.
    `UPDATE visitor SET name='${data.name}', comment='${data.comment}' WHERE id='${data.id}'`,
    (err, rows) => {
      if (err) throw err;
      console.log("패치 결과");
      console.log(rows);
      /*rows 결과!
      OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '(Rows matched: 1  Changed: 1  Warnings: 0',
  protocol41: true,
  changedRows: 1
}
      */
      console.log("결과 확인");
      cb(); //뭐가 전달되지?
    }
  );
};
