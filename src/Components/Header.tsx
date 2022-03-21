import React, { useEffect } from "react";
import useBoardStore from "src/zustand/useBoardStore";
import styled from "styled-components";

const StyledContainer = styled.div`
  text-align: center;
  padding-top: 1rem;
  border: none;
  outline: 5px double black;
`;

const StyledTimer = styled.span`
  position: absolute;
  left: 0;
  margin-left: 2rem;
  margin-top: 0.5rem;
  font-size: 1.5rem;
`;

const StyledTitle = styled.span`
  font-size: 2.5rem;
`;

function Header() {
  const {
    currentTime: count,
    setTimer,
    stopTimer,
    decreaseCount,
    initBoard,
  } = useBoardStore();

  // 브라우저 시작 시 타이머 시작
  useEffect(() => {
    //  1초마다 count 감소
    setTimer(decreaseCount);
  }, []);

  useEffect(() => {
    if (count < 0) {
      //  정답 변경 + 타이머 초기화 + 제출 기록 초기화
      stopTimer();
      initBoard();
    }
  }, [count]);

  return (
    <StyledContainer>
      <StyledTimer>
        {`${Math.floor(count / 60)
          .toString()
          .padStart(2, "0")} : ${(count % 60).toString().padStart(2, "0")}`}
      </StyledTimer>
      <StyledTitle>Wordle</StyledTitle>
    </StyledContainer>
  );
}

export default Header;
