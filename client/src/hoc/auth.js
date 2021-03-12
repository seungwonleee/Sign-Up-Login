import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
  // 접근 제한 옵션 설정 : option 값 아래 세가지 중 택1
  //null    =>  아무나 출입이 가능한 페이지
  //true    =>  로그인한 유저만 출입이 가능한 페이지
  //false   =>  로그인한 유저는 출입 불가능한 페이지

  // 관리지만 접근 가능한 페이지 adminRoute 값 입력
  //null  =>  아무나 접근 가능한 페이지
  //true  =>  아무나 접근 불가능한 페이지

  const AuthenticationCheck = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
        //로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          //로그인 한 상태
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) props.history.push("/");
          }
        }
      });
    }, []);

    return <SpecificComponent />;
    // return <SpecificComponent {...props} />; 각 페이지에 withRouter 없이도 라우팅 가능
  };
  return AuthenticationCheck;
}
