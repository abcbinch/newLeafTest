//수정 버튼을 눌렀을 때,
//1. 수정을 위한 입력창으로 변한다
//2. 실제 수정 데이터를 요청해야 한다. ???

//수정을 위한 입력창으로 변하는 함수
//GET /visitor 에서 하나의 데이터 조회
//기준점
function letUpdateVisitor(id) {
  const form = document.forms["visitor-form"];
  axios({
    method: "get", //get에서 post로 변경, 이게 원인일까?
    url: `/visitor/${id}`, // ${id}번째 댓글 가져오기
  })
    .then((res) => {
      console.log(res.data); //수정할 내용
      const { name, comment, id } = res.data; //왜 res.data에 없지?
      //res.send로 문자열을 보냈다.
      form.name.value = name; //왜 undefined?
      form.comment.value = comment; //왜 undefined?

      const btnContainer = document.getElementById("btn-group");
      const html = `
      <button type="button" onclick="updateDo(${id})">수정하기</button>
      <button type="button" onclick="updateCancel()">수정취소</button>
      `; //수정하기 눌렀을 때만 보인다.
      //수정을 하거나, 수정 취소를 할 수 있다.
      //updateDo의 id 부분이 undefined라고 뜬다. 왜지?
      btnContainer.innerHTML = html;
    })
    .catch((err) => console.log(err));
}

//수정이 완료된 데이터를 요청하는(보내주는) 함수
//수정을 해 준다.
function updateDo(id) {
  const form = document.forms["visitor-form"];

  if (form.name.value === "" || form.comment.value === "") {
    alert("이름과 내용을 모두 적어주세요.");
    return;
  }
  if (form.name.value.length > 10) {
    //name의 데이터 타입이 varchar(10)이라서 10글자 이상은 못 쓴다.
    //그래서 글자수 유효성 검사가 필요하다.
    alert("이름은 10글자 미만으로 작성해주세요.");
    return;
  }

  axios({
    method: "patch", //patch도 req.body에 담아서 보낸다.
    url: `/visitor/${id}`,
    // data: {
    //   id: id,
    //   comment: form.comment.value, //새로 입력한 내용
    //   name: form.name.value, //새로 입력한 내용
    // },
  })
    .then((res) => {
      console.log(res.data);
      const tr = document.querySelector(`#tr_${id}`);
      console.log(tr.children);
      // const { id, name, comment } = res.data;
      const { id } = res.data;
      const children = tr.children;
      children[1].textContent = form.name.value;
      children[2].textContent = form.comment.value;
    })
    .catch((err) => {
      console.log(err);
    });
}
//axios 에러라고? 네트워크 오류
//이거 controller랑 model도 살펴봐야겠다.

//수정을 취소한다
//따로 요청을 보내지는 않는다.
function updateCancel() {
  //먼저 form 안의 input을 초기화시킨다.
  const form = document.forms["visitor-form"];
  //둘 중 하나 마음에 드는 거 골라서 쓰자.
  form.reset();
  //form.name.value="";
  //form.comment.value = "";

  //등록 버튼이 다시 보이게 한다.
  const btnContainer = document.getElementById("btn-group");
  btnContainer.innerHTML = `<button type="button" onclick="letCreateVisitor()">방명록 등록</button>`;
}
