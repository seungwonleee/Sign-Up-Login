import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../../App.css";

function RegisterPage(props) {
  const { register, handleSubmit, watch, errors } = useForm();
  // const onSubmit = (formData) => console.log(formData);

  // 비밀번호 확인 유효성 검사 watch 메서드로 input value값 변경 감지
  const password = useRef();
  password.current = watch("password");

  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    console.log(formData);
    let body = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("회원가입에 실패했습니다.");
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
      <h1>회원가입 페이지</h1>

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

        <label>이름</label>
        <input name="name" ref={register({ required: true })} />
        {errors.name && <p>이름을 입력하세요.</p>}

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

        <label>비밀번호 확인</label>
        <input
          name="passwordConfirm"
          type="password"
          ref={register({
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.passwordConfirm?.type === "required" && (
          <p>비밀번호를 확인해주세요.</p>
        )}
        {errors.passwordConfirm?.type === "validate" && (
          <p>비밀번호가 일치하지 않습니다.</p>
        )}

        <button>가입하기</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
