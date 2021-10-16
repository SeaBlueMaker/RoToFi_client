import { useState } from "react";
import { useHistory } from "react-router";

import firebaseAPI from "../../api/firebase";
import { checkMember } from "../../api/service";

import Button from "../Button";

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
    <Button
      className="button button--round button--brown pop"
      content="Log In"
      onClick={handleLogin}
    />
  );
}
