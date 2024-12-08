const GameModel = (sequelize, DataTypes) => {
  const game = sequelize.define(
    "game",
    {
      game_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(63),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return game;
};

module.exports = GameModel;
