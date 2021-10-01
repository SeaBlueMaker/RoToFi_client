import { useHistory } from "react-router";

import firebaseAPI from "../../api/firebase";

import { registerUser } from "../../api/service";

import { OK } from "../../constants/messages";

export default function RegisterPage() {
  const history = useHistory();

  const handleButtonClick = async () => {
    const idToken = await firebaseAPI.getToken();
    const resource = { idToken };

    const response = await registerUser(idToken, resource);

    if (response === OK) {
      history.push("/");
    }
  };

  return (
    <div>
      작가 여러분 환영합니다~~~ 이 프로그램은 당신이 상상력을 마음껏 발휘할 수 있도록 도와줄 것입니다~
      <button onClick={handleButtonClick}>회원 등록</button>
    </div>
  );
}
