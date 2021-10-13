import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createCharacter } from "../../../api/service";

import { OK } from "../../../constants/messages";

import { insertCharacter } from "../../../modules/characters";

import addPhoto from "../../../utils/addPhoto";

export default function NewCharacter({ handleFinishAdd }) {
  const [ savedCharacter, setSavedCharacter ] = useState({});
  const [ name, setName ] = useState("");
  const [ role, setRole ] = useState("");
  const [ sex, setSex ] = useState("");
  const [ age, setAge ] = useState("");
  const [ appearance, setAppearance ] = useState("");
  const [ personality, setPersonality ] = useState("");
  const [ etc, setEtc ] = useState("");
  const [ imageURL, setImageURL ] = useState("");

  const dispatch = useDispatch();
  const projectId = useSelector(state => state.project._id);

  const postCharacter = async (character) => {
    try {
      const resource = {
        character,
        projectId,
      };

      const response = await createCharacter(resource);

      if (response.result === OK) {
        alert("새 인물이 생성되었습니다.");

        return response.createdCharacter;
      }
    } catch (error) {
      alert(error.message);

      return;
    }
  };

  const handleCompleteClick = async () => {
    const newCharacter = {
      name,
      role,
      sex,
      age,
      appearance,
      personality,
      etc,
      imageURL,
    };

    const createdCharacter = await postCharacter(newCharacter);

    setSavedCharacter(createdCharacter);
    handleFinishAdd(false);
  };

  const changeImage = async () => {
    const data = await addPhoto();

    if (!data) {
      alert("이미지를 첨부하지 못했습니다. 다시 시도해 주십시오.");

      return;
    }

    if (typeof data !== "string") {
      setImageURL(data.Location);
    }
  };

  useEffect(() => {
    if (savedCharacter.hasOwnProperty("_id")) {
      dispatch(insertCharacter(savedCharacter));
    }
  }, [savedCharacter]);

  return (
    <div className="character-info">
      <div className="first inputs">
        <input
          className="input-name"
          placeholder="이곳에 이름을 입력하세요"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoFocus
        />
        <button className="character-button" onClick={handleCompleteClick}>
          <img src="/images/complete_button.png" alt="완료 버튼" />
        </button>
      </div>
      <div className="second">
        <div className="character-image">
          {imageURL && (
            <img
              src={imageURL}
              alt="프로필 이미지"
              width="180"
              height="180"
            />
          )}
          <div className="image-uploader">
            <label htmlFor="uploader">
              <img
                className="image-uploader__image"
                src="/images/image_uploader_icon.png"
                alt="이미지 첨부 아이콘"
                width="45px"
                height="40px"
              />
            </label>
            <input
              className="image-uploader__input"
              type="file"
              id="uploader"
              accept=".png, .jpg, .jpeg"
              onChange={changeImage}
            />
          </div>
        </div>
        <div className="second-input inputs">
          <div>
            역할
            <textarea value={role} onChange={(event) => setRole(event.target.value)}/>
          </div>
          <div>
            성별
            <textarea value={sex} onChange={(event) => setSex(event.target.value)}/>
          </div>
          <div>
            나이
            <textarea value={age} onChange={(event) => setAge(event.target.value)}/>
          </div>
          <div>
          외관
            <textarea value={appearance} onChange={(event) => setAppearance(event.target.value)}/>
          </div>
        </div>
      </div>
      <div className="third inputs">
        <div>
          성격
          <textarea value={personality} onChange={(event) => setPersonality(event.target.value)}/>
        </div>
        <div>
          기타사항
          <textarea value={etc} onChange={(event) => setEtc(event.target.value)}/>
        </div>
      </div>
    </div>
  );
}
