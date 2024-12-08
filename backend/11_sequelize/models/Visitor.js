const Visitor = function (Sequelize, DataTypes) {
  const model = Sequelize.define(
    "visitor",
    {
      id: {
        // id INT PRIMARY KEY NOT NULL AUTO_INCREMENT
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, //not null 여부를 결정
      },
      name: {
        //VARCHAR(10) == STRING(10)
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      comment: {
        //comment mediumtext
        type: DataTypes.TEXT("medium"),
      },
    }, //여기까지가 컬럼 정의 파트
    {
      timestamps: false, //default가 true
      //튜플을 추가, 삭제, 수정할 때, 그 시간에 대해서도 기록하겠다는 뜻.
      //그럼 createdAt, updatedAt이라는 컬럼이 자동으로 생긴다.
      //그런데 나는 이걸 설정한 적 없어서 오류가 날 수 있다.
      freezeTableName: true, //default가 false
      //첫 번째 인자로 전달을 해 준 모델 이름을 그대로 쓰겠다는 뜻
      //테이블 이름을 고정하겠다.
    }
  );
  //모델 이름, 컬럼, 모델 옵션 각각 정의

  return model;
};
//define이 create table과 같은 역할

module.exports = Visitor;
