"use strict";

const Sequelize = require("sequelize");
// const config = require(__dirname + "/../config/config.json")["development"];
let config = require(__dirname + "/../config/config.js");
//db 정보가 config.js에 있다면 여기로
console.log("config 확인하기");
console.log(config);
config = config["development"];
//production을 읽어올 때 무조건 문자열 형태로 읽어야 하는데,
//점 표기법상 점 뒤에 문자열을 적으면 안 된다.
//config."production"  이렇게 쓰면 안된다는 것이다.
//그래서 production을 적을 때도 문자가 없도록 대괄호 표기법을 권장한다.
//__dirname은 models까지의 경로를 읽고 있다.
//부모 폴더로 올라가야 해서 .. 가 들어가 있다.
//require로 불러온 것이 객체
//대괄호 표기법으로 json 파일에서 development를 불러오고 있는 것이다.
//개발환경에서 돌리고 있기 때문에 development를 쓰고 있다.
const db = {};

let sequelize;
sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
//설정 정보(우측 sequelize)를
//키 값(좌측 db.sequelize)에 넣어주고 있는 것이다.

db.Sequelize = Sequelize;
//시퀄라이즈 모듈(우측 Sequelize)을
//Sequelize 키 값(좌측 db.Sequelize)에 넣어주고 있다.
//define등의 내장메소드가 들어있다.

/*
{
  sequelize: sequelize,
  Sequelize: Sequelize,
}
  이런 모습
*/
db.Visitor = require("./Visitor")(sequelize, Sequelize);
//설정정보와 시퀄라이즈 모듈이 각각 인자로 들어갔다.
/*
{
  sequelize: sequelize,
  Sequelize: Sequelize,
  Visitor: visitor 안에 들어있는 model
}
  이런 모습
*/

module.exports = db;
