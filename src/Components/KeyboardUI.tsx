import React from "react";
import { useKeyboard } from "src/hooks/useKeyboard";
import useBoardStore from "src/zustand/useBoardStore";
import styled from "styled-components";
import { BsBackspace } from "react-icons/bs";

const StyledKeyboard = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledKeyboardRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
  height: 4rem;
`;

const StyledKeyButton = styled.button`
  width: 4rem;
  height: 4rem;
  margin: 0 0.2rem;
  cursor: pointer;
  border: none;
  background-color: #ced4da;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: "GyeonggiTitleM";

  &.correct-button {
    background-color: #6aaa64;
    color: white;
  }
  &.similar-button {
    background-color: #c9b458;
    color: white;
  }
  &.wrong-button {
    background-color: #787c7e;
    color: white;
  }
`;

const keyboardRow = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

function KeyboardUI() {
  const { correctList, similarList, wrongList } = useBoardStore();
  const { inputKey } = useKeyboard();

  //  정답 일치 여부에 따른 키보드 버튼 색상 클래스 추가
  const checkColor = (key: string) => {
    if (correctList.indexOf(key) > -1) return "correct-button";
    else if (similarList.indexOf(key) > -1) return "similar-button";
    else if (wrongList.indexOf(key) > -1) return "wrong-button";
    else return "nothing-button";
  };

  return (
    <StyledKeyboard>
      {keyboardRow.map((row, rowIndex) => (
        <StyledKeyboardRow key={rowIndex}>
          {row.map((button, buttonIndex) => {
            switch (button) {
              case "BACKSPACE":
                return (
                  <StyledKeyButton
                    key={`${rowIndex}-${buttonIndex}`}
                    onClick={() => inputKey("Backspace")}
                    style={{ width: "6rem", padding: "1rem" }}
                    value={"Backspace"}
                  >
                    <BsBackspace size="2rem" />
                  </StyledKeyButton>
                );
              case "ENTER":
                return (
                  <StyledKeyButton
                    key={`${rowIndex}-${buttonIndex}`}
                    style={{ width: "8rem" }}
                    onClick={() => inputKey("Enter")}
                    value={"Enter"}
                  >
                    {button}
                  </StyledKeyButton>
                );
              default:
                return (
                  <StyledKeyButton
                    key={`${rowIndex}-${buttonIndex}`}
                    onClick={() => inputKey(button)}
                    value={button}
                    className={checkColor(button)}
                  >
                    {button}
                  </StyledKeyButton>
                );
            }
          })}
        </StyledKeyboardRow>
      ))}
    </StyledKeyboard>
  );
}

export default KeyboardUI;
