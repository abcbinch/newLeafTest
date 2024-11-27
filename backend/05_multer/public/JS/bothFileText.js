function fileAndTextUpload() {
  const formData = new FormData();

  const file = document.getElementById("dynamicFile");
  //파일 정보를 서버로 보내기 위해 file input 선택
  const title = document.getElementById("dynamicTitle");
  //이미지 제목(텍스트)를 서버로 보내기 위해 text input 선택
  const img = document.querySelector("img");
  //사진의 src 속성을 바꾸기 위해 선택

  console.log(file.files);

  //append는 데이터가 담긴 객체를 만들어준다.
  formData.append("dynamicFile", file.files[0]);
  formData.append("dynamicTitle", title.value);

  /*
  formData = {
    dynamicFile: 파일 정보(fileList[0])
    dynamicTitle: "사진 제목 string"
  }
  */

  axios({
    method: "post",
    url: "/dynamicUpload",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => {
      console.log(res.data);
      console.log(res.data.fileInfo.dynamicTitle);
      console.log(res.data.file.path);

      img.src = `/${res.data.file.path}`;
      img.alt = res.data.fileInfo.dynamicTitle + "사진";
      img.classList.add("profile");

      document.querySelector(".tit").innerText = res.data.fileInfo.dynamicTitle;
    })
    .catch((err) => console.log("WARNING! WARNING! " + err));
}
