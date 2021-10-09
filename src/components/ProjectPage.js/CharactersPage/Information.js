import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { modifyCharacter } from "../../../api/service";

import { OK } from "../../../constants/messages";

import { updateCharacter } from "../../../modules/characters";

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
        alert("수정이 완료되었습니다.");

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
        etc
      } = showingCharacter;

      setName(name);
      setRole(role);
      setSex(sex);
      setAge(age);
      setAppearance(appearance);
      setPersonality(personality);
      setEtc(etc);
    }
  }, [showingCharacter]);

  return (
    <div className="character-info">
      <div className="first inputs">
        {isEditable && (
          <input
            className="input-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoFocus
          />
        )}
        {!isEditable && (
          <div className="input-name">
            {showingCharacter?.name}
          </div>
        )}
        {!isEditable && (
          <button className="edit-button" onClick={handleEditClick}>
            <img src="/images/edit_button.png" alt="수정하기 버튼" />
          </button>
        )}
        {isEditable && (
          <button className="character-button" onClick={handleCompleteClick}>
            <img src="/images/complete_button.png" alt="완료 버튼" />
          </button>
        )}
      </div>
      <div className="second">
        <div className="character-image" />
        <div className="second-input inputs">
          <div>
            역할
            {isEditable && (
              <textarea value={role} onChange={(event) => setRole(event.target.value)}/>
            )}
            {!isEditable && (
              <div>
                {showingCharacter?.role}
              </div>
            )}
          </div>
          <div>
            성별
            {isEditable && (
              <textarea value={sex} onChange={(event) => setSex(event.target.value)}/>
            )}
            {!isEditable && (
              <div>
                {showingCharacter?.sex}
              </div>
            )}
          </div>
          <div>
            나이
            {isEditable && (
              <textarea value={age} onChange={(event) => setAge(event.target.value)}/>
            )}
            {!isEditable && (
              <div>
                {showingCharacter?.age}
              </div>
            )}
          </div>
          <div>
            외관
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
      <div className="third inputs">
        <div>
          성격
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
          기타사항
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
