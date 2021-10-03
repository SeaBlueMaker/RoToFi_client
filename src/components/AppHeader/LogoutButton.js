import { useHistory } from "react-router";

import firebaseAPI from "../../api/firebase";
import { logout } from "../../api/service";

import { OK } from "../../constants/messages";

export default function LogoutButton({ handleLoginStatus }) {
  const history = useHistory();

  const handleOnClick = async () => {
    const { result } = await logout();

    if (result === OK) {
      await firebaseAPI.logout();

      localStorage.removeItem("userId");

      handleLoginStatus(false);

      history.push("/");
    }
  };

  return (
    <button className="header-button" onClick={handleOnClick}>
      <img src="/images/logout_button.png" alt="로그아웃 버튼" />
    </button>
  );
}
