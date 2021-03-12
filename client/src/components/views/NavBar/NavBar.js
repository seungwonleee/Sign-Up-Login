import React from "react";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <nav>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
        }}
      >
        <li style={{ paddingRight: "20px" }}>
          <Link to="/">Home</Link>
        </li>
        <li style={{ paddingRight: "20px" }}>
          <Link to="/login">로그인</Link>
        </li>
        <li style={{ paddingRight: "20px" }}>
          <Link to="/register">회원가입</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
