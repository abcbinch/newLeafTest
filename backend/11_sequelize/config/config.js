//여기서 환경변수를 관리해도 된다.
//.env 파일에 따로 적은 다음 여기서 관리해야 한다.
//보여주고 싶지 않은 것이나
//보여서는 안되는 정보를 여기서 관리한다.

require("dotenv").config();

const development = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: "mysql",
};

const production = {
  username: process.env.DB_PROD_USERNAME,
  password: process.env.DB_PROD_PASSWORD,
  database: process.env.DB_PROD_DATABASE,
  host: process.env.DB_PROD_HOST,
  dialect: "mysql",
};

module.exports = { development, production };
