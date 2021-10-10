import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { updateLocation } from "../../../../api/service";

import { changeLocation } from "../../../../modules/plots";

import { OK } from "../../../../constants/messages";

export default function SituationTab({ plot, handlePlotChange }) {
  const { location } = plot;
  const { title, imageURL, description } = location;

  const [ changedTitle, setChangedTitle ] = useState(title);
  const [ changedDescription, setChangedDescription ] = useState(description);
  const [ changedImage, setChangedImage ] = useState(imageURL);
  const [ isEditable, setIsEditable ] = useState(false);

  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleCompleteClick = async () => {
    const resource = {
      plotId: plot._id,
      title: changedTitle,
      imageURL: changedImage,
      description: changedDescription,
    };

    const response = await updateLocation(resource);

    if (response.result === OK) {
      alert("작성이 완료되었습니다.");
    }

    const updatedLocation = response.updatedPlot.location;

    dispatch(changeLocation(updatedLocation, plot._id));
    handlePlotChange(response.updatedPlot);
    setIsEditable(false);
  };

  useEffect(() => {
    setChangedTitle(title);
    setChangedDescription(description);
    setChangedImage(imageURL);
  }, [location]);

  return (
    <div className="situation-tab">
      <div className="situation-header">
        {isEditable && (
          <textarea
            className="textarea-situation"
            value={changedTitle}
            onChange={(event) => setChangedTitle(event.target.value)}
          />
        )}
        {!isEditable && (
          <div className="title">
            {changedTitle}
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
      <div className="main-content">
        {isEditable && (
          <textarea
            className="textarea-situation"
            value={changedDescription}
            onChange={(event) => setChangedDescription(event.target.value)}
          />
        )}
        {!isEditable && (
          <div>
            {changedDescription}
          </div>
        )}
      </div>
    </div>
  );
}
