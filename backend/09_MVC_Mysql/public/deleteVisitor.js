function letDeleteVisitor(btn, id) {
  //버튼 태그도 가져온다.
  //visitor.ejs의 버튼에서 'this'라는 인자를 써서 보내줬다.
  console.log(id);
  axios({
    method: "delete",
    url: "/visitor",
    data: {
      id: id, //키 이름은 Cvisitor에서 쓰는 이름을 가져온 것.
    },
  })
    .then((txt) => {
      console.log(txt);
      //지우는 방법 여러 가지
      //   btn.parentElement.parentElement.remove();
      //1. parentElement로 td, 이어서 tr을 선택한다.
      btn.closest(`#tr_${id}`).remove();
      //2. 특정 요소의 가장 가까운 조상 요소를 선택한다.
    })
    .catch((err) => console.log(err));
}
