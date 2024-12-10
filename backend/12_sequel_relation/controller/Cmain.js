// const models = require("../models"); //== modles = {Player: ... , Profile: ...}
const { Player, Profile, Team } = require("../models");
const { Op } = require("sequelize");

exports.main = (req, res) => {
  res.render("index");
};

//GET 전체 선수 조회
exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.findAll();
    console.log(players);
    res.send(players);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

//GET 특정 선수 조회
// /players/:playerId
//players, profile, 이 둘을 join해주는 게 필요
exports.getPlayer = async (req, res) => {
  try {
    console.log(req.params);
    const { playerId } = req.params;
    //routes의 index에 있는 :playerId가 된다.
    const player = await Player.findOne({
      where: {
        player_id: { playerId },
        include: [{ model: Profile, attributes: ["position", "salary"] }],
        //attributes의 배열은 profile 테이블의 컬럼명과 일치해야 한다.
      },
    });
    res.send(player);
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR");
  }
};

//POST /players

//선수 추가

/*
{
name: '손흥민',
age: 30,
team_id: 1
}
*/
exports.postPlayer = async (req, res) => {
  try {
    console.log(req.body);
    // const newPlayer = await Player.create({
    //   //컬럼명이 넣을 데이터가 된다.
    //   name: req.body.name,
    //   age: req.body.age,
    //   teamid: req.body.team_id,
    // });
    //===
    const newPlayer = await Player.create(req.body);
    res.send(newPlayer);
    console.log("response");
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR");
  }
};

// Patch /players/:playerId/team
exports.patchPlayer = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params);
    const updatedPlayer = await Player.update(
      {
        //set 조건. 어떻게 바꿀지.
        teamid: req.body.teamId,
      },
      {
        //where 조건. 어떤 걸 바꿀지
        player_id: req.params.playerId,
      }
    );
    res.send(updatedPlayer);
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR");
  }
};

//DELETE /players/:playerId
//특정 선수 삭제
exports.deletePlayer = async (req, res) => {
  try {
    console.log(req.params);
    const { playerId } = req.params;
    const isDeleted = await Player.destroy({
      where: {
        //기본키를 기준으로 들어오기 때문에
        player_id: playerId,
      },
    });
    console.log("삭제 여부: " + isDeleted);
    if (Boolean(isDeleted)) {
      res.send("delete 성공");
    } else res.send(false);
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR");
  }
};

//복잡한 where 조건 사용
//GET /teams
//정렬, 검색 >> req.query 사용
exports.getTeams = async (req, res) => {
  try {
    console.log(req.query);
    const { sort, search } = req.query;
    let teams;
    if (sort === "name_asc") {
      //name_asc 라는 요청이 들어올 경우
      //팀 이름 순으로 정렬해서 전체 조회
      teams = await Team.findAll({
        attributes: ["team_id", "name"],
        order: [["name", "ASC"]],
        //ORDER BY name ASC 와 같다.
        //order by는 여러 개 설정할 수 있기 때문에 배열 안에 배열이 들어있는 것.
      });
    } else if (search) {
      //search, 키워드 기준으로 검색 후 조회
      teams = await Team.findAll({
        attributes: ["team_id", "name"],
        where: {
          name: { [Op.like]: `%${search}%` },
          //op를 어떻게 해야 객체를 자동으로 불러올 수 있지
        },
      });
      //SELECT team_id, name
      //WHERE name LIKE %K%
    } else {
      //sort가 name_asc가 아니거나, search가 안 들어왔을 때
      //전체 조회
      teams = await Team.findAll({
        attributes: ["team_id", "name"],
      });
    }
    //검색 로직은 종료
    if (teams.length === 0) {
      //teams는 무조건 배열이 나온다.
      res.send("다시 검색하세요. 정보가 없어요.");
    } else {
      res.send(teams);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR");
  }
};

// GET /teams/:teamId
// 특정 팀 조회
exports.getTeam = async (req, res) => {
  try {
    const oneTeam = await Team.findOne({
      where: {
        team_id: req.params.teamId,
      },
    }); //query 아니고 params

    res.send(oneTeam);
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR");
  }
};

//GET /teams/:teamId/players
//특정 팀의 모든 선수 조회 >> join
exports.getTeamPlayers = async (req, res) => {
  try {
    const { teamId } = req.params;
    //1. 특정 팀의 선수정보만 조회(조인 없음)
    // const allPlayers = await Player.findAll({
    //   where: {
    //     teamid: teamId,
    //     //players 안의 외래 키 이름으로 맞추기. 언더바 넣지 말고.
    //   },
    // });

    //2.특정 팀의 정보와 해당 팀의 선수까지 확인(조인)

    const allTeamPlayers = await Team.findOne({
      where: { team_id: teamId },
      include: [{ model: Player }],
    });

    // res.send(allPlayers);
    res.send(allTeamPlayers);
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR");
  }
};
