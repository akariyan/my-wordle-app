import React from "react";
import Header from "./Components/Header";
import Board from "./Components/Board";
import KeyboardUI from "./Components/KeyboardUI";
import styled, { createGlobalStyle } from "styled-components";
import Modal from "react-modal";

//  전역 스타일
const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'GyeonggiTitleM';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/GyeonggiTitleM.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  body {
    margin: 0;
    font-family: 'GyeonggiTitleM';
  }
`;

const Layout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 4rem auto 16rem;
  .Toastify__toast--error {
    margin-top: 3vh;
  }
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <Layout>
        <Header />
        <Board />
        <KeyboardUI />
      </Layout>
    </>
  );
}

// Modal 이외의 Element 숨기기
Modal.setAppElement("#root");
export default App;
