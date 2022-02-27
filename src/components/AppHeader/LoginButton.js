import { useEffect } from "react";
import { useState } from "react";

import firebaseAPI from "../../api/firebase";

import {
  checkMember,
  registerUser,
} from "../../api/service";

import {
  SERVER_PROBLEM,
  WELCOME_REGISTER,
  OK,
} from "../../constants/messages";

import Button from "../Button";

import "./style.scss";

export default function LoginButton({ handleLoginStatus }) {
  const [ idToken, setIdToken ] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await checkMember(idToken);
      const { userId, result } = response;

      if (userId) {
        window.sessionStorage.setItem("userId", userId);

        handleLoginStatus(true);

        return;
      }

      if (result === OK) {
        const idToken = await firebaseAPI.getToken();
        const resource = { idToken };

        const { result } = await registerUser(idToken, resource);

        if (result === OK) {
          alert(WELCOME_REGISTER);
        }

        return;
      }

      alert(SERVER_PROBLEM);
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
