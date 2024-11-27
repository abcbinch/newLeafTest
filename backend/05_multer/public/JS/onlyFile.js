function fileUpload() {
  const file = document.getElementById("dynamicFile");
  console.log(file);
  console.dir(file);
  console.log(file.files);
  console.log(file.files[0]);

  const formData = new FormData();
  formData.append("dynamicFile", file.files[0]); //dynamicFile이라는 키에, 파일 정보를 담아 보냄.
  axios({
    method: "post",
    url: "/dynamicUpload",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data", //form의 enctype이랑 같은 역할
    },
  }).then((res) => {
    console.log(res.data);
    console.log(res.data.path);

    const img = document.querySelector("img");
    img.src = `/statics/${res.data.path}`;
  });
}
