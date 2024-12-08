const TeamGameModel = (sequelize, DataTypes) => {
  const teamgame = sequelize.define(
    "teamgame",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return teamgame;
};

module.exports = TeamGameModel;
