import { useState } from "react";
import { useHistory } from "react-router";

import firebaseAPI from "../../api/firebase";
import { checkMember } from "../../api/service";

export default function LoginButton({ handleLoginStatus }) {
  const [idToken, setIdToken] = useState(null);

  const history = useHistory();

  if (idToken) {
    checkMember(idToken).then(({ userId }) => {
      if (userId) {
        localStorage.setItem("userId", userId);

        handleLoginStatus(true);

        history.push("/");

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

  return <button onClick={handleLogin}>로그인</button>;
}
