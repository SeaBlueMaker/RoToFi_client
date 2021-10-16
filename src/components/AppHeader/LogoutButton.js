import { useHistory } from "react-router";

import firebaseAPI from "../../api/firebase";
import { logout } from "../../api/service";

import Button from "../Button";

import { OK } from "../../constants/messages";

export default function LogoutButton({ handleLoginStatus }) {
  const history = useHistory();

  const handleLogout = async () => {
    const { result } = await logout();

    if (result === OK) {
      await firebaseAPI.logout();

      localStorage.removeItem("userId");

      handleLoginStatus(false);

      history.push("/");
    }
  };

  return (
    <Button
      className="button button--round button--brown"
      content="Log Out"
      onClick={handleLogout}
    />
  );
}
