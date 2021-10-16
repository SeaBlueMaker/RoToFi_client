import { useHistory } from "react-router";

import { MAIN_TITLE } from "../../constants/src";

import Button from "../Button";

export default function MainPage() {
  const history = useHistory();

  const handleOnClick = () => {
    history.push("/projects");
  };

  return (
    <div className="main">
      <img
        className="main__image"
        src="/images/writing.jpeg"
        alt="노트 위로 글을 쓰는 손 사진"
      />
      <img
        className="main__title"
        src={MAIN_TITLE}
        alt="Modern fonts"
      />
      <Button
        className="button button--square button--transparent pop"
        content="Go to Project List"
        onClick={handleOnClick}
      />
    </div>
  );
};
