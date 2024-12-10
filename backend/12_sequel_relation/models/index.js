"use strict";

const Sequelize = require("sequelize");

// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.js")[env];
const config = require(__dirname + "/../config/config.js")["devel"];
const db = {};
//1. Sequelize 클래스를 사용해서 sequelize 객체를 생성했다.
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
console.log("config 결과");
console.log(config);
console.log("sequelize 결과");
console.log(sequelize);
//2. 모델을 불러오면서 인자로 정보 전달.
const PlayerModel = require("./Player")(sequelize, Sequelize);
const ProfileModel = require("./Profile")(sequelize, Sequelize);
const GameModel = require("./Game")(sequelize, Sequelize);
const TeamModel = require("./Team")(sequelize, Sequelize);
const TeamGameModel = require("./TeamGame")(sequelize, Sequelize);

//3. 모델 간의 관계 설정
//1대1
//player:profile
PlayerModel.hasOne(ProfileModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "player_id",
});
ProfileModel.belongsTo(ProfileModel, {
  foreignKey: "player_id",
});

//1대 다
//team: player
TeamModel.hasMany(PlayerModel, {
  foreignKey: "teamid", //내가 정해주는 이름
  sourceKey: "team_id", //실제로 참조할 키의 이름
  //실제 Team 모델의 컬럼명과 같은 이름이어야 함
  //models/Team.js의 Primary Key
});
PlayerModel.belongsTo(TeamModel, {
  foreignKey: "teamid",
  targetKey: "team_id",
});
//다대다
//team:game
//중개테이블(teamgame)을 활용해야 함
TeamModel.belongsToMany(GameModel, {
  through: TeamGameModel,
  foreignKey: "team_id",
});
GameModel.belongsToMany(TeamModel, {
  through: TeamGameModel,
  foreignKey: "game_id",
});

//4. db객체에 모델 추가
//원래는 2번, 4번 과정을 동시에 했었지만,
//관계를 설정하려면 2번과 4번을 분리해야 한다.
//맨 위에 db 변수에 빈 객체를 넣어놨다.
db.Player = PlayerModel;
db.Profile = ProfileModel;
db.Game = GameModel;
db.Team = TeamModel;
db.TeamGame = TeamGameModel;
db.sequelize = sequelize; //require mysql 이랑 같다
db.Sequelize = Sequelize; //mysql.createConnection이랑 같다.

module.exports = db;
