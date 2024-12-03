const User = require("../model/User");

//GET /user
exports.getUser = (req, res) => {
  console.log(User.userInfo());
  res.render("user", {
    userInfo: User.userInfo(),
  });
};
// {...User.userInfo()}라고 써도 된다.
