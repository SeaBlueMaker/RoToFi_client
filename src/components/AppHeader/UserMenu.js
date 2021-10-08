import { useState } from "react";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function UserMenu() {
  const hasUserId = !!localStorage.getItem("userId");

  const [ isLogin, setLoginStatus ] = useState(hasUserId);

  const handleClick = (boolean) => setLoginStatus(boolean);

  return (
    <div>
      {!isLogin && <LoginButton handleLoginStatus={handleClick} />}
      {isLogin && <LogoutButton handleLoginStatus={handleClick}/>}
    </div>
  );
}
