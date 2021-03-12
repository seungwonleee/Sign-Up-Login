import axios from "axios";
import React from "react";
import { withRouter } from "react-router-dom";

function LangingPage(props) {
  const handleClick = () => {
    axios.get("/api/users/logout").then((response) => {
      console.log(response);
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃을 실패했습니다.");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>Home(시작 페이지)</h1>

        <button onClick={handleClick}>로그아웃</button>
      </div>
    </div>
  );
}

export default withRouter(LangingPage);
