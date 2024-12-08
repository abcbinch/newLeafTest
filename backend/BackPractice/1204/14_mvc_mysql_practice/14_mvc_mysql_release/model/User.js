// TODO: DB(mysql) 연결
// TODO: 모델 코드
const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "sesac",
  password: "0401",
  database: "newLeaf",
});

//1. 회원 생성
exports.createMember = (data) => {
  //axios가 필요하다.
  //axios post로 받아온 req.body가 data
  conn.query(
    `INSERT INTO user VALUES(null, '${data.userid}', '${data.name}', '${data.pw}')`,
    (err, rows) => {
      if (err) {
        console.log(err);
      }
      //콜백함수는 일단 필요없어보인다.
      //나중에 보자.
    }
  );
};

//2. 회원 체크
//해당 아이디가 있는지, 패스워드가 맞는지 여기서 확인한다.
//conn.query 이중으로 만들 수 있나?
exports.getMember = (data, cb) => {
  conn.query(
    `SELECT * FROM user WHERE userid='${data.userid}'`,
    (err, rows) => {
      if (err) {
        throw err;
      }
      console.log("여기는 model");
      console.log(data);
      console.log(rows);
      cb(rows); //해당 아이디의 패스워드
      //컨트롤러의 result로 간다.
    }
  );
};

//2-3 사이
//req.body에 담긴 내용을 토대로 정보를 전부 불러와서 프로필 페이지에 보여준다.
exports.showMemberInfo = (data, cb) => {
  // console.log("여기는 model의 showMemberInfo");
  // console.log(data);
  // console.log(data.userid);
  conn.query(`SELECT * FROM user WHERE userid='${data}'`, (err, rows) => {
    if (err) {
      throw err;
    }
    cb(rows);
  });
};

//3. 정보 수정
exports.updateInfo = (data, cb) => {
  conn.query(
    `UPDATE user SET userid='${data.userid}', name='${data.name}', pw=${data.pw} WHERE id=${data.id}`,
    (err, rows) => {
      if (err) {
        throw err;
      }

      console.log("여기는 model의 updateInfo");
      console.log(rows);
      console.log("이것이 쿼리 결과");
      cb(); //콜백이 들어가 있기는 한데, 매개변수가 없다.
      //뭘 반환하는 거지?
      //cb는 controller의 두번째 인자 부분에 들어가는 함수를 가리킨다.
      //착각하지 말 것.
    }
  );
  console.log(data);
};

//4. 회원 삭제
exports.deleteMember = (data, cb) => {
  conn.query(
    `DELETE FROM user WHERE userid='${data.userid}' AND id=${data.id}`,
    (err, rows) => {
      if (err) {
        console.log(err);
      }

      cb(rows);
    }
  );
};
