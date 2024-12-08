const PlayerModel = (sequelize, DataTypes) => {
  const player = sequelize.define(
    "player",
    {
      player_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(63),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTabelName: true,
    }
  );

  return player;
};

//외래 키 설정은
//외래 키를 참조하고 있는 테이블 쪽(즉, 자식 테이블)에서 해 줘야 한다.

module.exports = PlayerModel;
