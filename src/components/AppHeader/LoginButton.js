import { useEffect } from "react";
import { useState } from "react";

import firebaseAPI from "../../api/firebase";

import {
  checkMember,
  registerUser,
} from "../../api/service";

import { OK } from "../../constants/messages";

import Button from "../Button";

import "./style.scss";

export default function LoginButton({ handleLoginStatus }) {
  const [ idToken, setIdToken ] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await checkMember(idToken);
      const { userId } = response;

      if (userId) {
        localStorage.setItem("userId", userId);

        handleLoginStatus(true);
      } else {
        const idToken = await firebaseAPI.getToken();
        const resource = { idToken };

        const { result } = await registerUser(idToken, resource);

        if (result === OK) {
          alert("환영합니다! 회원등록이 완료되었으니 로그인 후 이용해주십시오.");
        }
      }
    }

    if (idToken) {
      fetchData();
    }
  }, [idToken]);

  const handleLogin = async () => {
    try {
      await firebaseAPI.login();

      const idToken = await firebaseAPI.getToken();

      setIdToken(idToken);
    } catch (error) {
      alert(error.message);

      return;
    }
  };

  return (
    <Button
      className="button button--round button--brown pop"
      content="Sign In / Sign Up"
      onClick={handleLogin}
    />
  );
}
