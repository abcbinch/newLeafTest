import { useState } from "react";

const Counter = () => {
  const [number, setNumber] = useState(0);

  const increase = () => {
    setNumber(number + 1);
  };

  const alertMsg = (msg) => {
    alert(`${msg}~~ 현재 number state는 ${number}입니다.`);
  };

  const consoleMsg = (e, msg) => {
    console.log(`${msg}~~ 현재 number state는 ${number}입니다.`);
    console.log(e.target);
  };

  const handleClick = (e) => {
    console.log(e.target); //실제로 누르고 있는 것
    console.log(e.currentTarget); //현재 이벤트가 발생되고 있는 곳곳
  };

  return (
    <div>
      <h3>number counter</h3>
      <h5>{number}</h5>
      <button onClick={increase}>더하기</button>
      <button onClick={() => alertMsg("안녕하세요?")}>alert 출력</button>
      <button
        onClick={(e) => {
          consoleMsg(e, "hello");
        }}
      >
        console 확인
      </button>
      <button onClick={handleClick}>
        <span>handleClick</span>
      </button>
    </div>
  );
};
export default Counter;
