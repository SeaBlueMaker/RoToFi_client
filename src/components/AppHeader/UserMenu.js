import { useState } from "react";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import ThemeSelect from "./ThemeSelect";

export default function UserMenu() {
  const hasUserId = !!localStorage.getItem("userId");

  const [ isLogin, setLoginStatus ] = useState(hasUserId);

  const handleClick = (boolean) => setLoginStatus(boolean);

  return (
    <div className="user-menu">
      <ThemeSelect />
      {!isLogin && <LoginButton handleLoginStatus={handleClick} />}
      {isLogin && <LogoutButton handleLoginStatus={handleClick}/>}
    </div>
  );
}
