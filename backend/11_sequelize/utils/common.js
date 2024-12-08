//여러 군데에서 사용되는 js 코드들을 작성한는 공간
//공유 재산, 공공재
/**
 * 서버 에러가 났을 때 실행될 코드 모음
 * @param {Error} err 실제 에러 내용을 전달한다.
 * @param {string} errMsgInServer 서버 콘솔에 띄워줄 메시지
 * @param {string} errMsgInClient 클라이언트 콘솔에 띄워줄 메시지
 * @param {number} statusCode 에러의 상태 코드
 */
//jsdocs 라는 것이 있다.
// /** 을 입력하면 자동완성 창이 뜨는데
//거기서 선택하면 나온다
//변수에 대해 설명해준다고 한다.

exports.errorlog = (
  err,
  errMsgInServer = "ERROR!!",
  errMsgInClient = "INTERNAL SERVER ERROR!!",
  statusCode = 500
) => {
  console.log(`${errMsgInServer}: `, err);
  res.status(500).send("INTERNAL SERVER ERROR");
};
