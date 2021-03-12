import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../../App.css";

function LoginPage(props) {
  const { register, handleSubmit, watch, errors } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    console.log(formData);
    let body = {
      email: formData.email,
      password: formData.password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("로그인에 실패했습니다.");
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
        flexDirection: "column",
      }}
    >
      <h1>로그인 페이지</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>이메일</label>
        <input
          name="email"
          ref={register({
            required: true,
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
          })}
        />
        {errors.email?.type === "required" && <p>이메일을 작성하세요.</p>}
        {errors.email?.type === "pattern" && (
          <p>이메일 형식에 맞게 작성하세요.</p>
        )}

        <label>비밀번호 (*최소 5자리 이상)</label>
        <input
          name="password"
          type="password"
          ref={register({ required: true, minLength: 5 })}
        />
        {errors.password?.type === "required" && <p>비밀번호를 입력하세요.</p>}
        {errors.password?.type === "minLength" && (
          <p>최소 5글자 이상 작성하세요.</p>
        )}

        <button>로그인</button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
