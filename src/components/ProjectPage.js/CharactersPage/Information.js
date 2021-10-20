import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { modifyCharacter } from "../../../api/service";

import {
  UPDATE_COMPLETED,
  OK,
  FAILED_UPLOAD_IMAGE,
} from "../../../constants/messages";

import { updateCharacter } from "../../../modules/characters";

import addPhoto from "../../../utils/addPhoto";
import Button from "../../Button";

export default function Information({ isEditable, handleEditable, showingCharacter, handleShowingCharacter }) {
  const [ updatedCharacter, setUpdatedCharacter ] = useState({});
  const [ name, setName ] = useState("");
  const [ role, setRole ] = useState("");
  const [ sex, setSex ] = useState("");
  const [ age, setAge ] = useState("");
  const [ appearance, setAppearance ] = useState("");
  const [ personality, setPersonality ] = useState("");
  const [ etc, setEtc ] = useState("");
  const [ imageURL, setImageURL ] = useState("");

  const dispatch = useDispatch();

  const patchCharacter = async (character) => {
    try {
      const resource = {
        characterId: showingCharacter._id,
        character,
      };

      const response = await modifyCharacter(resource);

      if (response.result === OK) {
        alert(UPDATE_COMPLETED);

        return response.updatedCharacterData;
      }
    } catch (error) {
      alert(error.message);

      return;
    }
  };

  const handleEditClick = () => {
    handleEditable(true);
  };

  const handleCompleteClick = async () => {
    const character = {
      name,
      role,
      sex,
      age,
      appearance,
      personality,
      etc,
      imageURL,
    };

    const modifiedCharacter = await patchCharacter(character);

    setUpdatedCharacter(modifiedCharacter);
  };

  useEffect(() => {
    if (updatedCharacter.hasOwnProperty("_id")) {
      dispatch(updateCharacter(updatedCharacter));
      handleEditable(false);
      handleShowingCharacter(updatedCharacter);
    }
  }, [updatedCharacter]);

  useEffect(() => {
    if (showingCharacter?.hasOwnProperty("_id")) {
      const {
        name,
        role,
        sex,
        age,
        appearance,
        personality,
        etc,
        imageURL,
      } = showingCharacter;

      setName(name);
      setRole(role);
      setSex(sex);
      setAge(age);
      setAppearance(appearance);
      setPersonality(personality);
      setEtc(etc);
      setImageURL(imageURL);
    }
  }, [showingCharacter]);

  const changeImage = async () => {
    const data = await addPhoto();

    if (!data) {
      alert(FAILED_UPLOAD_IMAGE);

      return;
    }

    if (typeof data !== "string") {
      setImageURL(data.Location);
    }
  };

  return (
    <div className="character-info">
      <div className="box-wrap">
        {isEditable && (
          <input
            className="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoFocus
          />
        )}
        {!isEditable && (
          <div className="name">
            {showingCharacter?.name}
          </div>
        )}
        {!isEditable && (
          <button className="edit-button rotate" onClick={handleEditClick}>
            <img src="/images/edit_button.png" alt="수정하기 버튼" />
          </button>
        )}
        {isEditable && (
          <Button
            className="button button--square button--brown pop"
            content="Save"
            onClick={handleCompleteClick}
          />
        )}
      </div>
      <div className="box-wrap">
        <div className="character-image">
          {imageURL && (
            <img
              src={imageURL}
              alt="등장인물 이미지"
              width="180"
              height="180"
            />
          )}
          {isEditable && (
            <div className="image-uploader image-uploader-character">
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
          )}
        </div>
        <div className="character-info-basic">
          <div className="box">
            <div className="title">역할</div>
            {isEditable && (
              <textarea value={role} onChange={(event) => setRole(event.target.value)}/>
            )}
            {!isEditable && (
              <div>
                {showingCharacter?.role}
              </div>
            )}
          </div>
          <div className="box">
            <div className="title">성별</div>
            {isEditable && (
              <textarea value={sex} onChange={(event) => setSex(event.target.value)}/>
            )}
            {!isEditable && (
              <div>
                {showingCharacter?.sex}
              </div>
            )}
          </div>
          <div className="box">
            <div className="title">나이</div>
            {isEditable && (
              <textarea value={age} onChange={(event) => setAge(event.target.value)}/>
            )}
            {!isEditable && (
              <div>
                {showingCharacter?.age}
              </div>
            )}
          </div>
          <div className="box">
            <div className="title">외관</div>
            {isEditable && (
              <textarea value={appearance} onChange={(event) => setAppearance(event.target.value)}/>
            )}
            {!isEditable && (
              <div>
                {showingCharacter?.appearance}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="character-info-detail">
        <div className="box">
          <div className="title">성격</div>
          {isEditable && (
            <textarea value={personality} onChange={(event) => setPersonality(event.target.value)}/>
          )}
          {!isEditable && (
            <div>
              {showingCharacter?.personality}
            </div>
          )}
        </div>
        <div>
          <div className="title">기타사항</div>
          {isEditable && (
            <textarea value={etc} onChange={(event) => setEtc(event.target.value)}/>
          )}
          {!isEditable && (
            <div>
              {showingCharacter?.etc}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
