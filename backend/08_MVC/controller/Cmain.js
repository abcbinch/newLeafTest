//맨 앞의 C는 controller를 의미

const Comment = require("../model/Comment");
//모델 폴더에서 코멘트를 불러와야 한다.

//GET
exports.main = (req, res) => {
  res.render("index");
};

//GET /comments
exports.comments = (req, res) => {
  const fakeDB = Comment.commentInfos();
  console.log(fakeDB);
  res.render("comments", {
    commentInfo: fakeDB,
  });
};

//GET /commentDetail/:id
exports.commentDetail = (req, res) => {
  const fakeDB = Comment.commentInfos();
  console.log(req.params);
  console.log(req.query);
  //   res.send("응답 완료");
  const commentId = req.params.id;
  console.log("commentId는 " + commentId);
  console.log(fakeDB[commentId - 1]);
  if (commentId < 1 || commentId > fakeDB.length) {
    res.render("404");
  }

  if (isNaN(commentId)) {
    res.render("404");
  }
  res.render("commentDetail", { commentInfo: fakeDB[commentId - 1] });
};
