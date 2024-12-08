console.log("welcome to the home");
//왜 안 될까

const tbody = document.querySelector("tbody");

function letCreateVisitor() {
  console.log("letCreateVisitor 시작");
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
    method: "post",
    url: "/visitor",
    data: {
      name: form.name.value,
      comment: form.comment.value,
    },
  })
    .then((res) => {
      console.log(res.data);
      //등록했을 때, 텍스트란이 지워지고
      //새로고침 없이 이름과 방명록이 추가된다.
      const { id, comment, name } = res.data;
      const newTd = `
        <tr id="tr_${id}">
        <td>${id}</td>
        <td>${name}</td>
        <td>${comment}</td>
        <td><button>수정</button></td>
        <td><button>삭제</button></td>
        `;
      tbody.insertAdjacentHTML("beforeend", newTd); //beforeend: 맨 뒤에 추가
      //innerHTML과 비슷하지만 다른 점은
      //innerHTML은 기존의 내용이 지워진다?
      //insertAdjacentHTML을 써야 자연스럽게 추가된다.
    })
    .catch((err) => {
      console.log(err);
    });
}
