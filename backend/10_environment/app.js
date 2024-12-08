const express = require("express");
const app = express();
console.log(process.env);
//숨기고 있다.
const PORT = process.env.PORT;
const dotenv = require("dotenv");
dotenv.config();
console.log("db port number: " + PORT);
console.log("db name: " + process);

app.get("/", (req, res) => {
  res.send("get 요청입니다.");
});

// app.post(/)

app.listen(port, () => {
  console.log(`http://localhost:${PORT}`);
});
