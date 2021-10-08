import { useState } from "react";
import { useHistory } from "react-router";

import firebaseAPI from "../../api/firebase";
import { checkMember } from "../../api/service";

import "./style.scss";

export default function LoginButton({ handleLoginStatus }) {
  const [ idToken, setIdToken ] = useState(null);

  const history = useHistory();

  if (idToken) {
    checkMember(idToken).then(({ userId }) => {
      if (userId) {
        localStorage.setItem("userId", userId);

        handleLoginStatus(true);

        history.push("/projects");

        return;
      }

      history.push("/users/register");
    });
  }

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
    <button className="header-button" onClick={handleLogin}>
      <img src="/images/login_button.png" alt="로그인 버튼" />
    </button>
  );
}
